import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Mail, Search, Inbox, Archive, Star, StarOff, Trash2,
  Eye, Clock, Building2, Phone, X, Loader2, CheckCheck,
  MailOpen, RefreshCw
} from 'lucide-react';
import { contactApi } from '@/lib/api';

type TabType = 'inbox' | 'starred' | 'archived';

interface Submission {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  is_starred: boolean;
  notes: string | null;
  created_at: string;
  read_at: string | null;
}

interface Stats {
  total: number;
  unread: number;
  starred: number;
  archived: number;
  today: number;
  this_week: number;
}

const Forms = () => {
  const [activeTab, setActiveTab] = useState<TabType>('inbox');
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDetail, setShowDetail] = useState(false);

  const tabs = [
    { id: 'inbox' as TabType, name: 'Gelen Kutusu', icon: Inbox, count: stats?.unread || 0 },
    { id: 'starred' as TabType, name: 'Yıldızlı', icon: Star, count: stats?.starred || 0 },
    { id: 'archived' as TabType, name: 'Arşiv', icon: Archive, count: stats?.archived || 0 },
  ];

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [submissionsRes, statsRes] = await Promise.all([
        contactApi.getSubmissions({
          is_archived: activeTab === 'archived' ? true : false,
          is_starred: activeTab === 'starred' ? true : undefined,
        }),
        contactApi.getStats()
      ]);
      setSubmissions(submissionsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Veriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSubmission = async (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowDetail(true);

    // Mark as read if not already
    if (!submission.is_read) {
      try {
        await contactApi.markAsRead(submission.id);
        setSubmissions(prev => prev.map(s =>
          s.id === submission.id ? { ...s, is_read: true } : s
        ));
        if (stats) {
          setStats({ ...stats, unread: stats.unread - 1 });
        }
      } catch (error) {
        console.error('Okundu işaretlenirken hata:', error);
      }
    }
  };

  const handleToggleStar = async (e: React.MouseEvent, submission: Submission) => {
    e.stopPropagation();
    try {
      await contactApi.updateSubmission(submission.id, { is_starred: !submission.is_starred });
      setSubmissions(prev => prev.map(s =>
        s.id === submission.id ? { ...s, is_starred: !s.is_starred } : s
      ));
      if (stats) {
        setStats({
          ...stats,
          starred: submission.is_starred ? stats.starred - 1 : stats.starred + 1
        });
      }
    } catch (error) {
      console.error('Yıldız güncellenirken hata:', error);
    }
  };

  const handleArchive = async (submission: Submission) => {
    try {
      await contactApi.updateSubmission(submission.id, { is_archived: true });
      setSubmissions(prev => prev.filter(s => s.id !== submission.id));
      setShowDetail(false);
      setSelectedSubmission(null);
      if (stats) {
        setStats({ ...stats, archived: stats.archived + 1 });
      }
    } catch (error) {
      console.error('Arşivlenirken hata:', error);
    }
  };

  const handleDelete = async (submission: Submission) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;
    try {
      await contactApi.deleteSubmission(submission.id);
      setSubmissions(prev => prev.filter(s => s.id !== submission.id));
      setShowDetail(false);
      setSelectedSubmission(null);
      loadData(); // Refresh stats
    } catch (error) {
      console.error('Silinirken hata:', error);
    }
  };

  const handleBulkMarkAsRead = async () => {
    if (selectedIds.length === 0) return;
    try {
      await contactApi.bulkMarkAsRead(selectedIds);
      setSubmissions(prev => prev.map(s =>
        selectedIds.includes(s.id) ? { ...s, is_read: true } : s
      ));
      setSelectedIds([]);
      loadData();
    } catch (error) {
      console.error('Toplu işlem hatası:', error);
    }
  };

  const handleBulkArchive = async () => {
    if (selectedIds.length === 0) return;
    try {
      await contactApi.bulkArchive(selectedIds);
      setSubmissions(prev => prev.filter(s => !selectedIds.includes(s.id)));
      setSelectedIds([]);
      loadData();
    } catch (error) {
      console.error('Toplu işlem hatası:', error);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === submissions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(submissions.map(s => s.id));
    }
  };

  const filteredSubmissions = submissions.filter(s =>
    s.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.company && s.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (s.subject && s.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Az önce';
    if (diffMins < 60) return `${diffMins} dk önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays < 7) return `${diffDays} gün önce`;
    return date.toLocaleDateString('tr-TR');
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-10rem)]">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mesajlar</h2>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </div>
                    {tab.count > 0 && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Stats */}
            {stats && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-xs text-gray-500">Toplam</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-600">{stats.today}</p>
                    <p className="text-xs text-gray-500">Bugün</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="bg-white rounded-t-xl border border-gray-100 p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Mesaj ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                {selectedIds.length > 0 && (
                  <>
                    <button
                      onClick={handleBulkMarkAsRead}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <CheckCheck className="w-4 h-4" />
                      Okundu
                    </button>
                    <button
                      onClick={handleBulkArchive}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <Archive className="w-4 h-4" />
                      Arşivle
                    </button>
                  </>
                )}
                <button
                  onClick={loadData}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  title="Yenile"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 bg-white border-x border-gray-100 overflow-y-auto">
            {filteredSubmissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Mail className="w-12 h-12 mb-4 opacity-30" />
                <p>Mesaj bulunamadı</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {/* Select All */}
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === submissions.length && submissions.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">
                      {selectedIds.length > 0 ? `${selectedIds.length} seçili` : 'Tümünü seç'}
                    </span>
                  </label>
                </div>

                {filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => handleSelectSubmission(submission)}
                    className={`flex items-start gap-4 p-4 cursor-pointer transition-colors ${
                      !submission.is_read ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                    } ${selectedSubmission?.id === submission.id ? 'bg-primary/5' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(submission.id)}
                      onChange={(e) => { e.stopPropagation(); toggleSelect(submission.id); }}
                      className="w-4 h-4 mt-1 rounded border-gray-300"
                    />
                    <button
                      onClick={(e) => handleToggleStar(e, submission)}
                      className={`mt-0.5 ${submission.is_starred ? 'text-yellow-500' : 'text-gray-300 hover:text-gray-400'}`}
                    >
                      {submission.is_starred ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`truncate ${!submission.is_read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {submission.first_name} {submission.last_name}
                        </h4>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatDate(submission.created_at)}
                        </span>
                      </div>
                      {submission.company && (
                        <p className="text-sm text-gray-500 truncate">{submission.company}</p>
                      )}
                      <p className={`text-sm truncate ${!submission.is_read ? 'text-gray-700' : 'text-gray-500'}`}>
                        {submission.subject || submission.message.substring(0, 100)}
                      </p>
                    </div>
                    {!submission.is_read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-white rounded-b-xl border border-gray-100 px-4 py-3">
            <p className="text-sm text-gray-500">
              {filteredSubmissions.length} mesaj gösteriliyor
            </p>
          </div>
        </div>

        {/* Detail Panel */}
        {showDetail && selectedSubmission && (
          <div className="lg:w-96 flex-shrink-0 bg-white rounded-xl border border-gray-100 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Mesaj Detayı</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleToggleStar({ stopPropagation: () => {} } as any, selectedSubmission)}
                  className={`p-2 rounded-lg ${selectedSubmission.is_starred ? 'text-yellow-500' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  {selectedSubmission.is_starred ? <Star className="w-5 h-5 fill-current" /> : <Star className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => handleArchive(selectedSubmission)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"
                  title="Arşivle"
                >
                  <Archive className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(selectedSubmission)}
                  className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                  title="Sil"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { setShowDetail(false); setSelectedSubmission(null); }}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Sender Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {selectedSubmission.first_name[0]}{selectedSubmission.last_name[0]}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {selectedSubmission.first_name} {selectedSubmission.last_name}
                  </h4>
                  <p className="text-sm text-gray-500">{selectedSubmission.email}</p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-2 mb-4 text-sm">
                {selectedSubmission.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {selectedSubmission.phone}
                  </div>
                )}
                {selectedSubmission.company && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    {selectedSubmission.company}
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  {formatFullDate(selectedSubmission.created_at)}
                </div>
                {selectedSubmission.is_read && selectedSubmission.read_at && (
                  <div className="flex items-center gap-2 text-green-600">
                    <MailOpen className="w-4 h-4" />
                    Okundu: {formatFullDate(selectedSubmission.read_at)}
                  </div>
                )}
              </div>

              {/* Subject */}
              {selectedSubmission.subject && (
                <div className="mb-4">
                  <h5 className="text-xs font-medium text-gray-500 uppercase mb-1">Konu</h5>
                  <p className="text-gray-900 font-medium">{selectedSubmission.subject}</p>
                </div>
              )}

              {/* Message */}
              <div>
                <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Mesaj</h5>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-100">
              <a
                href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject || 'İletişim Formu'}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                <Mail className="w-4 h-4" />
                E-posta Gönder
              </a>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Forms;

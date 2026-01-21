import AdminLayout from '@/components/admin/AdminLayout';
import { Users, Plus, MoreHorizontal, Mail, Phone } from 'lucide-react';

const Team = () => {
  const team = [
    { id: 1, name: 'Erkan Öztürk', role: 'Kurucu & CEO', email: 'erkan@ecoconsult.com', phone: '+90 532 XXX XX XX', avatar: 'EÖ' },
    { id: 2, name: 'Ayşe Yılmaz', role: 'Kıdemli Danışman', email: 'ayse@ecoconsult.com', phone: '+90 533 XXX XX XX', avatar: 'AY' },
    { id: 3, name: 'Mehmet Demir', role: 'ESG Uzmanı', email: 'mehmet@ecoconsult.com', phone: '+90 534 XXX XX XX', avatar: 'MD' },
    { id: 4, name: 'Zeynep Kaya', role: 'Proje Yöneticisi', email: 'zeynep@ecoconsult.com', phone: '+90 535 XXX XX XX', avatar: 'ZK' },
    { id: 5, name: 'Ali Çelik', role: 'Veri Analisti', email: 'ali@ecoconsult.com', phone: '+90 536 XXX XX XX', avatar: 'AÇ' },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Takım Yönetimi</h2>
          <p className="text-sm text-gray-500 mt-1">Ekip üyelerini yönetin</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Yeni Üye
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => (
          <div key={member.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">{member.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                {member.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4" />
                {member.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Team;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactFormSchema = z.object({
  fullName: z.string()
    .trim()
    .min(1, { message: "Ad soyad gereklidir" })
    .max(100, { message: "Ad soyad 100 karakterden kısa olmalıdır" }),
  email: z.string()
    .trim()
    .email({ message: "Geçerli bir email adresi giriniz" })
    .max(255, { message: "Email 255 karakterden kısa olmalıdır" }),
  phone: z.string()
    .trim()
    .max(20, { message: "Telefon numarası 20 karakterden kısa olmalıdır" })
    .optional(),
  company: z.string()
    .trim()
    .min(1, { message: "Şirket adı gereklidir" })
    .max(100, { message: "Şirket adı 100 karakterden kısa olmalıdır" }),
  sector: z.string()
    .min(1, { message: "Lütfen bir sektör seçiniz" }),
  message: z.string()
    .trim()
    .min(10, { message: "Mesaj en az 10 karakter olmalıdır" })
    .max(1000, { message: "Mesaj 1000 karakterden kısa olmalıdır" }),
  kvkkConsent: z.boolean()
    .refine((val) => val === true, {
      message: "KVKK onayı gereklidir",
    }),
});

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    sector: '',
    message: '',
    kvkkConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectors = [
    'Enerji',
    'İmalat',
    'Perakende',
    'Finans',
    'Teknoloji',
    'İnşaat',
    'Gıda',
    'Tekstil',
    'Otomotiv',
    'Sağlık',
    'Eğitim',
    'Diğer',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Başarılı!",
        description: "Mesajınız alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        sector: '',
        message: '',
        kvkkConsent: false,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Hata",
          description: "Lütfen formu eksiksiz ve doğru doldurunuz.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-border animate-fade-in">
      <h2 className="font-heading font-bold text-3xl text-foreground mb-8">
        İletişim Formu
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="font-body font-medium text-foreground mb-2 block">
            Ad Soyad <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="font-body h-12"
            placeholder="Adınız ve soyadınız"
            maxLength={100}
          />
          {errors.fullName && (
            <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email" className="font-body font-medium text-foreground mb-2 block">
              E-posta <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="font-body h-12"
              placeholder="ornek@sirket.com"
              maxLength={255}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="font-body font-medium text-foreground mb-2 block">
              Telefon
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="font-body h-12"
              placeholder="+90 XXX XXX XX XX"
              maxLength={20}
            />
            {errors.phone && (
              <p className="text-destructive text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Company & Sector */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="company" className="font-body font-medium text-foreground mb-2 block">
              Şirket Adı <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="font-body h-12"
              placeholder="Şirket adınız"
              maxLength={100}
            />
            {errors.company && (
              <p className="text-destructive text-sm mt-1">{errors.company}</p>
            )}
          </div>

          <div>
            <Label htmlFor="sector" className="font-body font-medium text-foreground mb-2 block">
              Sektör <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.sector}
              onValueChange={(value) => setFormData({ ...formData, sector: value })}
            >
              <SelectTrigger className="font-body h-12 bg-white">
                <SelectValue placeholder="Sektör seçiniz" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {sectors.map((sector) => (
                  <SelectItem 
                    key={sector} 
                    value={sector}
                    className="font-body"
                  >
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.sector && (
              <p className="text-destructive text-sm mt-1">{errors.sector}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="font-body font-medium text-foreground mb-2 block">
            Mesajınız <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="font-body min-h-[150px]"
            placeholder="Lütfen bizimle paylaşmak istediğiniz detayları yazınız..."
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <p className="text-destructive text-sm">{errors.message}</p>
            ) : (
              <span className="text-muted-foreground text-sm">
                {formData.message.length}/1000 karakter
              </span>
            )}
          </div>
        </div>

        {/* KVKK Consent */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="kvkkConsent"
            checked={formData.kvkkConsent}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, kvkkConsent: checked as boolean })
            }
            className="mt-1"
          />
          <div className="flex-1">
            <Label 
              htmlFor="kvkkConsent" 
              className="font-body text-sm text-foreground cursor-pointer"
            >
              İletişim bilgilerimin kullanılmasını onaylıyorum <span className="text-destructive">*</span>
            </Label>
            {errors.kvkkConsent && (
              <p className="text-destructive text-sm mt-1">{errors.kvkkConsent}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-primary hover:bg-primary-light font-body font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;

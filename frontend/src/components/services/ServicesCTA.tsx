import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "İsim gereklidir" })
    .max(100, { message: "İsim 100 karakterden kısa olmalıdır" }),
  email: z.string()
    .trim()
    .email({ message: "Geçerli bir email adresi giriniz" })
    .max(255, { message: "Email 255 karakterden kısa olmalıdır" }),
  service: z.string()
    .min(1, { message: "Lütfen bir hizmet seçiniz" }),
});

const ServicesCTA = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Karbon Ayak İzi Hesaplama',
    'TSRS Uyumluluk ve Raporlama',
    'Tedarik Zinciri ESG',
    'Net Sıfır Stratejisi',
    'Risk Yönetimi',
    'ESG Eğitimi',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Başarılı!",
        description: "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      });

      // Reset form
      setFormData({ name: '', email: '', service: '' });
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
          description: "Lütfen formu eksiksiz doldurunuz.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-4">
              Hangi Hizmete İhtiyacınız Var?
            </h2>
            <p className="font-body text-xl text-white/90">
              Size özel teklif için formu doldurun, uzmanlarımız en kısa sürede ulaşsın
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="space-y-6">
              {/* Name field */}
              <div>
                <Label htmlFor="name" className="font-body font-medium text-foreground mb-2 block">
                  Ad Soyad
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="font-body h-12"
                  placeholder="Adınız ve soyadınız"
                  maxLength={100}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <Label htmlFor="email" className="font-body font-medium text-foreground mb-2 block">
                  Email
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

              {/* Service dropdown */}
              <div>
                <Label htmlFor="service" className="font-body font-medium text-foreground mb-2 block">
                  Hizmet Seçimi
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                >
                  <SelectTrigger className="font-body h-12 bg-white">
                    <SelectValue placeholder="Hizmet seçiniz" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {services.map((service) => (
                      <SelectItem 
                        key={service} 
                        value={service}
                        className="font-body"
                      >
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="text-destructive text-sm mt-1">{errors.service}</p>
                )}
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-primary hover:bg-primary-light font-body font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Teklif Alın'}
              </Button>
            </div>

            <p className="font-body text-sm text-muted-foreground text-center mt-6">
              Talebiniz alındıktan sonra 24 saat içinde size dönüş yapacağız
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;

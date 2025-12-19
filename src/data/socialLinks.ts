export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
  htmlIcon?: string;
  gradient: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "WhatsApp",
    url: "https://wa.me/5581998721990",
    icon: "fab fa-whatsapp",
    gradient: "linear-gradient(135deg, #25D366, #128C7E)"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/declarafacilofc?igsh=NzVlcTVzc3RnazAz",
    icon: "fab fa-instagram",
    gradient: "linear-gradient(135deg, #E4405F, #833AB4, #C13584)"
  },
  {
    name: "Declara Fácil",
    url: "https://declarafacil.lovable.app/",
    htmlIcon: '<img src="https://live.staticflickr.com/65535/54761899522_0d25284838_t.jpg" alt="Logo Declara Fácil" class="w-8 h-8 rounded-sm">',
    gradient: "linear-gradient(135deg, #06B6D4, #1D4ED8)"
  },
  {
    name: "Notion",
    url: "https://hickory-chickadee-639.notion.site/Direito-1509137ee9938080a35edb8b3de41518?source=copy_link",
    htmlIcon: '<img src="https://live.staticflickr.com/65535/54761886877_1d7788504b_t.jpg" alt="Logo Notion" class="w-8 h-8 rounded-sm">',
    gradient: "linear-gradient(135deg, #2D2D2D, #000000)"
  },
  {
    name: "Materiais de Aula de Bibliologia",
    url: "https://1drv.ms/f/c/d7f729cbda9c8f34/EstF-Kq8VS5CppT5X0iuVIABPywtRgentcgVFo8E-o_9ag?e=GfhiM1",
    icon: "fas fa-book",
    gradient: "linear-gradient(135deg, #D97706, #92400E)"
  },
  {
    name: "E-books",
    url: "https://1drv.ms/f/c/d7f729cbda9c8f34/Ej3omYejh6FMpQleQ73NWVIBxCZoqd8dDLq81Vhc1-h9uA?e=fioCDP",
    icon: "fas fa-book-open",
    gradient: "linear-gradient(135deg, #6366F1, #4338CA)"
  },
  {
    name: "GitHub",
    url: "https://github.com/adehas25",
    icon: "fab fa-github",
    gradient: "linear-gradient(135deg, #374151, #111827)"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/adelson-elias-5a97ab36a/",
    icon: "fab fa-linkedin",
    gradient: "linear-gradient(135deg, #0EA5E9, #1E40AF)"
  },
  {
    name: "Currículo Lattes",
    url: "http://lattes.cnpq.br/3683659654561054",
    icon: "fas fa-graduation-cap",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)"
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@adelsoneliasoficial",
    icon: "fab fa-youtube",
    gradient: "linear-gradient(135deg, #EF4444, #DC2626)"
  }
];

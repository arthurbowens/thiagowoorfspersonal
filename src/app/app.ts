import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { IconComponent } from './icons.component';

interface Benefit {
  icon: string;
  title: string;
  text: string;
}

interface ResultSlide {
  image: string;
  caption: string;
}

interface Testimonial {
  name: string;
  age: number;
  detail: string;
  text: string;
  months: number;
}

@Component({
  selector: 'app-root',
  imports: [IconComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly whatsappUrl = 'https://wa.me/5581989231234';

  protected readonly benefits: Benefit[] = [
    {
      icon: 'target',
      title: 'Treino sob medida',
      text: 'Montado pro seu corpo, rotina e objetivo. Nada de ficha copiada da internet.',
    },
    {
      icon: 'dumbbell',
      title: 'Hipertrofia + definição',
      text: 'Volume, intensidade e progressão calculados pra você ganhar massa e marcar o físico.',
    },
    {
      icon: 'message',
      title: 'Acompanhamento de verdade',
      text: 'Dúvida no treino? Manda no WhatsApp. Respondo e ajusto — não te deixo no vácuo.',
    },
  ];

  protected readonly results: ResultSlide[] = [
    { image: 'resultado1.jpeg', caption: 'Definição visível com treino consistente e ajustes semanais.' },
    { image: 'resultado2.jpeg', caption: 'Cintura marcada e evolução real em poucos meses de acompanhamento.' },
    { image: 'resultado3.jpeg', caption: 'Ganho de massa e definição — processo, não milagre de 30 dias.' },
  ];

  protected readonly testimonials: Testimonial[] = [
    {
      name: 'Rafael M.',
      age: 27,
      detail: 'Recife · Engenheiro',
      months: 4,
      text: 'Achava que tinha que passar 2h na academia. O Thiago montou treino de 50 min que funciona de verdade. Ganhei braço e peitoral sem virar escravo da academia.',
    },
    {
      name: 'Camila S.',
      age: 32,
      detail: 'Boa Viagem · Advogada',
      months: 3,
      text: 'Voltei a treinar depois de 2 anos parada com medo de machucar o joelho de novo. Ele adaptou tudo e mesmo assim consegui definir bastante. Não é aquele personal que ignora limitação.',
    },
    {
      name: 'João Pedro',
      age: 24,
      detail: 'Estudante · Zona Norte',
      months: 5,
      text: 'Responde no zap igual amigo, não some depois que você paga. Travei no stiff e ele mandou vídeo na hora explicando. Isso muda o jogo quando você treina sozinho.',
    },
    {
      name: 'Patricia L.',
      age: 38,
      detail: 'Enfermeira · escala 12x36',
      months: 6,
      text: 'Nunca tinha rotina fixa por causa do plantão. Ele montou treino pra quando só consigo ir 3x na semana. Pela primeira vez tô vendo costas e glúteo responder.',
    },
    {
      name: 'Lucas A.',
      age: 29,
      detail: 'TI · Home office',
      months: 2,
      text: 'Entrei querendo só emagrecer. Em 8 semanas já tava focando em hipertrofia porque o corpo mudou demais. O plano evolui junto, não fica engessado.',
    },
  ];

  protected readonly activeSlide = signal(0);

  private readonly carouselRef = viewChild<ElementRef<HTMLElement>>('carousel');

  protected onCarouselScroll(): void {
    const el = this.carouselRef()?.nativeElement;
    if (!el) return;

    const slides = el.querySelectorAll<HTMLElement>('.lp-carousel-slide');
    if (!slides.length) return;

    let closest = 0;
    let minDiff = Infinity;

    slides.forEach((slide, i) => {
      const diff = Math.abs(slide.offsetLeft - el.scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });

    this.activeSlide.set(closest);
  }

  protected goToSlide(index: number): void {
    const el = this.carouselRef()?.nativeElement;
    if (!el) return;

    const slide = el.querySelectorAll<HTMLElement>('.lp-carousel-slide')[index];
    if (!slide) return;

    el.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    this.activeSlide.set(index);
  }

  protected scrollCarousel(direction: -1 | 1): void {
    const next = this.activeSlide() + direction;
    if (next >= 0 && next < this.results.length) {
      this.goToSlide(next);
    }
  }
}

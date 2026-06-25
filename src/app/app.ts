import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { IconComponent } from './icons.component';

interface Benefit {
  icon: string;
  title: string;
  text: string;
}

interface ResultSlide {
  image: string;
}

interface Testimonial {
  name: string;
  detail: string;
  text: string;
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
      text: 'Dúvida no treino? Manda no WhatsApp. Respondo e ajusto. Não te deixo no vácuo.',
    },
  ];

  protected readonly results: ResultSlide[] = Array.from({ length: 8 }, (_, i) => ({
    image: `resultado${i + 1}.jpeg`,
  }));

  protected readonly testimonials: Testimonial[] = [
    {
      name: 'Rafael M.',
      detail: 'Recife, engenheiro',
      text: 'Achava que tinha que ficar horas na academia. O Thiago montou um treino enxuto que funciona de verdade. Ganhei braço e peitoral sem virar escravo da academia.',
    },
    {
      name: 'Camila S.',
      detail: 'Boa Viagem, advogada',
      text: 'Voltei a treinar depois de muito tempo parada com medo de machucar o joelho de novo. Ele adaptou tudo e mesmo assim consegui definir bastante.',
    },
    {
      name: 'João Pedro',
      detail: 'Estudante, Zona Norte',
      text: 'Responde no zap igual amigo, não some depois que você paga. Travei no stiff e ele mandou vídeo na hora explicando. Isso muda o jogo quando você treina sozinho.',
    },
    {
      name: 'Patricia L.',
      detail: 'Enfermeira, escala de plantão',
      text: 'Nunca tinha rotina fixa por causa do trabalho. Ele montou treino flexível e pela primeira vez tô vendo costas e glúteo responder.',
    },
    {
      name: 'Lucas A.',
      detail: 'TI, home office',
      text: 'Entrei querendo emagrecer e logo já tava focando em hipertrofia porque o corpo mudou demais. O plano evolui junto, não fica engessado.',
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

import Image from "next/image";
import Link from "next/link";
import {
  UtensilsCrossed,
  Lightbulb,
  Cloud,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { images } from "@/lib/images";
import { stats } from "@/lib/constants";
import { services } from "@/lib/services";
import CTA from "@/components/shared/CTA";

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed className="h-8 w-8 text-accent-gold" />,
  Lightbulb: <Lightbulb className="h-8 w-8 text-accent-gold" />,
  Cloud: <Cloud className="h-8 w-8 text-accent-gold" />,
  BarChart3: <BarChart3 className="h-8 w-8 text-accent-gold" />,
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-73px)] items-center justify-center">
        <Image
          src={images.hero}
          alt={images.heroAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="animate-fade-in-up font-heading text-5xl font-bold leading-tight md:text-7xl">
            Launch Your Restaurant.
            <br />
            Done Right.
          </h1>
          <p className="animate-fade-in-up animation-delay-100 mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            Michelin-starred expertise for restaurants and food businesses across
            Thailand and Southeast Asia.
          </p>
          <div className="animate-fade-in-up animation-delay-200 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CTA href="/free-consultation">Get Started</CTA>
            <CTA href="/case-studies" variant="secondary">
              Our Work
            </CTA>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 px-6 md:flex-row md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                index < stats.length - 1
                  ? "md:border-r md:border-border md:pr-16"
                  : ""
              } ${index > 0 ? "md:pl-16" : ""}`}
            >
              <span className="font-heading text-4xl font-bold text-accent-gold">
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-foreground-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            What We Do
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-xl border border-border bg-background-card p-8 transition-colors hover:border-accent-gold"
              >
                <div className="mb-4">{iconMap[service.icon]}</div>
                <h3 className="font-heading text-xl font-bold">
                  {service.shortTitle}
                </h3>
                <p className="mt-2 text-foreground-muted line-clamp-2">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent-gold transition-colors group-hover:text-accent-gold-light">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="bg-background-secondary py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-foreground-subtle">
              Featured Case Study
            </span>
            <p className="mt-4 font-heading text-5xl font-bold text-accent-gold">
              +180% Revenue
            </p>
            <h3 className="mt-4 font-heading text-2xl font-bold">
              Italian Bistro Turnaround, Bangkok
            </h3>
            <p className="mt-3 text-foreground-muted">
              A struggling Sukhumvit restaurant transformed through menu
              re-engineering, repositioned branding, and operational overhaul.
            </p>
            <Link
              href="/case-studies"
              className="mt-6 inline-flex items-center gap-2 text-accent-gold transition-colors hover:text-accent-gold-light"
            >
              Read Case Study <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={images.caseStudies.italianBistro}
              alt={images.caseStudies.italianBistroAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="font-heading text-6xl text-accent-gold">&ldquo;</span>
          <blockquote className="mt-2 font-heading text-2xl italic leading-relaxed">
            Penny transformed our menu and our bottom line. Within three months
            we saw a 22% increase in average check size and our food costs
            dropped to under 30% for the first time.
          </blockquote>
          <div className="mt-8">
            <p className="font-medium text-foreground">Marco Rossi</p>
            <p className="text-sm text-foreground-muted">
              Owner, Trattoria Rossi, Bangkok
            </p>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-background-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-bold">
              Insights &amp; Guides
            </h2>
            <Link
              href="/blog"
              className="hidden items-center gap-1 text-accent-gold transition-colors hover:text-accent-gold-light sm:inline-flex"
            >
              View All Insights <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "How Much Does It Cost to Open a Restaurant in Bangkok?",
                date: "Coming Soon",
              },
              {
                title: "Menu Engineering 101: The Science Behind Profitable Menus",
                date: "Coming Soon",
              },
              {
                title: "Cloud Kitchen vs. Traditional Restaurant: Which Is Right for You?",
                date: "Coming Soon",
              },
            ].map((post) => (
              <div
                key={post.title}
                className="rounded-xl border border-border bg-background-card p-6"
              >
                <p className="text-xs text-foreground-subtle">{post.date}</p>
                <h3 className="mt-2 font-heading text-lg font-bold leading-snug">
                  {post.title}
                </h3>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-accent-gold"
            >
              View All Insights <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-4xl font-bold md:text-5xl">
            Ready to start?
          </h2>
          <p className="mt-4 text-lg text-foreground-muted">
            Whether you are opening a new restaurant or optimizing an existing
            one, we can help you get there faster.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CTA href="/free-consultation">Book a Free Call</CTA>
            <CTA href="/contact" variant="secondary">
              Get in Touch
            </CTA>
          </div>
          <p className="mt-6 text-sm text-foreground-subtle">
            Free 30-minute strategy call. No obligation.
          </p>
        </div>
      </section>
    </>
  );
}

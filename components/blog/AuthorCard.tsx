export default function AuthorCard() {
  return (
    <div className="bg-background-card rounded-xl p-6 border border-border flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
        <span className="text-accent-gold font-heading text-lg font-bold">
          P
        </span>
      </div>
      <div>
        <h3 className="font-heading text-lg text-foreground">Penny</h3>
        <p className="text-accent-gold text-sm mb-1">
          Michelin-starred culinary consultant
        </p>
        <p className="text-foreground-muted text-sm">
          With over 15 years of experience across Thailand and Southeast Asia,
          Penny has helped launch and transform 50+ restaurants, from street food
          concepts to fine dining establishments.
        </p>
      </div>
    </div>
  );
}

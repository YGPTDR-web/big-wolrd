export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-gold-400/10 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-5 pt-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-xl font-bold gold-text">Arcanum</div>
          <p className="mt-1 max-w-md text-sm text-parchment-200/70">
            一个用于组织与展示你自己虚构世界观的档案空间。由黑曜石与羊皮纸铸成。
          </p>
        </div>
        <div className="ornament">
          <span>Finis · 归档</span>
        </div>
      </div>
    </footer>
  );
}
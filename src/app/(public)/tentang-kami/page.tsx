import type { Metadata } from "next";
import { Avatar } from "@/components/shared/avatar";
import { getOrgMembers } from "@/modules/organization/data/placeholder-org-members";

export const metadata: Metadata = {
  title: "Tentang Kami — Smart Taruna Ten",
  description: "Profil, visi misi, dan struktur organisasi Smart Taruna Ten.",
};

const MISSION_POINTS = [
  "Menghidupkan kegiatan gotong royong dan kepedulian sosial antarwarga.",
  "Membuka ruang bagi pemuda untuk berkontribusi nyata di lingkungan sendiri.",
  "Menjaga transparansi pengelolaan kegiatan dan dana melalui pelaporan terbuka.",
  "Membangun jejaring dengan UMKM dan pemuda antar-wilayah.",
];

// WHY Tentang Kami, Visi & Misi, and Struktur Organisasi live on one
// page instead of three: the Navbar already links here as a single
// "Tentang Kami" item, and each section is short enough on its own
// that splitting them would mean more clicks for exactly the
// less-tech-savvy visitors this project is built for, with no real
// benefit in return.
export default function TentangKamiPage() {
  const orgMembers = getOrgMembers();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <header>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Tentang Kami
        </h1>
      </header>

      <section aria-labelledby="tentang-heading" className="mt-10">
        <p className="text-lg leading-relaxed text-foreground">
          Smart Taruna Ten adalah wadah digital Karang Taruna RW 05 —
          dibangun supaya kegiatan, berita, dan pengelolaan dana organisasi
          bisa diikuti siapa saja, bukan cuma yang datang ke rapat. Setiap
          program yang berjalan, dari kerja bakti sampai pelatihan UMKM,
          dicatat dan dilaporkan lewat platform ini.
        </p>
      </section>

      <section aria-labelledby="visi-misi-heading" className="mt-14">
        <h2
          id="visi-misi-heading"
          className="font-serif text-2xl font-bold text-foreground sm:text-3xl"
        >
          Visi & Misi
        </h2>
        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <p className="text-sm font-semibold text-primary">Visi</p>
          <p className="mt-2 text-base leading-relaxed text-foreground">
            Menjadi Karang Taruna yang aktif, transparan, dan dipercaya oleh
            seluruh warga sebagai penggerak kegiatan sosial di lingkungan.
          </p>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-card p-6">
          <p className="text-sm font-semibold text-primary">Misi</p>
          <ul className="mt-3 space-y-2">
            {MISSION_POINTS.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-base leading-relaxed text-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="struktur-heading" className="mt-14">
        <h2
          id="struktur-heading"
          className="font-serif text-2xl font-bold text-foreground sm:text-3xl"
        >
          Struktur Organisasi
        </h2>
        <p className="mt-2 text-muted-foreground">
          Periode kepengurusan 2026–2028.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orgMembers.map((member) => (
            <li
              key={member.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              <Avatar name={member.name} photoUrl={member.photoUrl} />
              <div>
                <p className="font-semibold text-foreground">{member.name}</p>
                <p className="text-sm text-muted-foreground">
                  {member.position}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

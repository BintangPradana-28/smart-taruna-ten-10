import type { Metadata } from "next";
import Link from "next/link";
import { QrCode } from "lucide-react";
import { DonationAmountPicker } from "@/modules/donations/components/donation-amount-picker";
import { DONATION_INFO } from "@/modules/donations/data/donation-info";

export const metadata: Metadata = {
  title: "Donasi — Smart Taruna Ten",
  description:
    "Dukung kegiatan Karang Taruna lewat donasi transparan — QRIS, transfer bank, dan laporan penggunaan dana terbuka untuk semua.",
};

export default function DonasiPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <header>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Donasi
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Setiap donasi disalurkan langsung untuk kegiatan warga — kerja
          bakti, bantuan sosial, hingga pelatihan UMKM. Penggunaan dana
          dilaporkan terbuka setiap triwulan.
        </p>
      </header>

      <section
        aria-labelledby="qris-heading"
        className="mt-10 rounded-lg border border-border bg-card p-6"
      >
        <h2 id="qris-heading" className="text-lg font-semibold text-foreground">
          Scan QRIS atau Transfer Manual
        </h2>

        <div className="mx-auto mt-4 flex aspect-square w-48 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {DONATION_INFO.qrisImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- see components/shared/avatar.tsx
            <img
              src={DONATION_INFO.qrisImageUrl}
              alt="Kode QRIS donasi Smart Taruna Ten"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <QrCode className="h-10 w-10" aria-hidden="true" />
              <span className="text-xs">QRIS belum diunggah</span>
            </div>
          )}
        </div>

        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Bank</dt>
            <dd className="font-medium text-foreground">
              {DONATION_INFO.bankName}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">No. Rekening</dt>
            <dd className="font-medium text-foreground">
              {DONATION_INFO.accountNumber}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Atas Nama</dt>
            <dd className="font-medium text-foreground">
              {DONATION_INFO.accountHolder}
            </dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="nominal-heading"
        className="mt-8 rounded-lg border border-border bg-card p-6"
      >
        <DonationAmountPicker />
      </section>

      <section
        aria-labelledby="transparansi-heading"
        className="mt-8 rounded-lg border border-dashed border-border p-6"
      >
        <h2
          id="transparansi-heading"
          className="text-sm font-semibold text-foreground"
        >
          Ke Mana Perginya Donasi?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Setiap tiga bulan, pengurus menerbitkan laporan rinci penggunaan
          dana — termasuk nota dan bukti transaksi.
        </p>
        <Link
          href="/berita/kategori/transparansi"
          className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
        >
          Baca laporan transparansi terbaru →
        </Link>
      </section>
    </div>
  );
}

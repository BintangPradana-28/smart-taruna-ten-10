export interface SuggestedAmount {
  label: string;
  value: number;
}

export const SUGGESTED_AMOUNTS: SuggestedAmount[] = [
  { label: "Rp 25.000", value: 25000 },
  { label: "Rp 50.000", value: 50000 },
  { label: "Rp 100.000", value: 100000 },
  { label: "Rp 250.000", value: 250000 },
];

// WHY these live in one config object instead of hardcoded in the
// page: bank account, WA number, and the QRIS image are the kind of
// detail that changes when treasurers change — one place to edit
// instead of hunting through JSX every time.
export const DONATION_INFO = {
  bankName: "Bank BRI",
  accountNumber: "1234-5678-9012",
  accountHolder: "Kas Smart Taruna Ten",
  // Format internasional tanpa tanda "+". Placeholder — GANTI dengan
  // nomor WhatsApp bendahara/pengurus yang sesungguhnya sebelum live.
  whatsappNumber: "6281234567890",
  // TODO: isi dengan URL gambar QRIS resmi organisasi setelah tersedia.
  qrisImageUrl: null as string | null,
};

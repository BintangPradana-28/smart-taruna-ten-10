"use client";

import { useState } from "react";
import {
  DONATION_INFO,
  SUGGESTED_AMOUNTS,
} from "@/modules/donations/data/donation-info";

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// WHY WhatsApp instead of a form that posts to a database: there's no
// donations backend wired up yet, and a form that silently goes
// nowhere is worse than no form. A wa.me link needs no server at all
// and mirrors how these confirmations already happen in practice —
// transfer, then message the treasurer directly.
function buildWhatsappConfirmationUrl(amount: number | null): string {
  const amountText = amount ? formatRupiah(amount) : "___________";
  const message = `Halo, saya ingin konfirmasi donasi sebesar ${amountText} untuk Smart Taruna Ten.\n\nNama: \nTanggal transfer: `;
  return `https://wa.me/${DONATION_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function DonationAmountPicker() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const activeAmount = customAmount
    ? Number(customAmount) || null
    : selectedAmount;

  return (
    <div>
      <h2 id="nominal-heading" className="text-lg font-semibold text-foreground">
        Pilih Nominal
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SUGGESTED_AMOUNTS.map((amount) => {
          const isActive = selectedAmount === amount.value && !customAmount;
          return (
            <button
              key={amount.value}
              type="button"
              onClick={() => {
                setSelectedAmount(amount.value);
                setCustomAmount("");
              }}
              aria-pressed={isActive}
              className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary"
              }`}
            >
              {amount.label}
            </button>
          );
        })}
      </div>

      <label className="mt-4 block">
        <span className="text-sm text-muted-foreground">
          Atau masukkan nominal lain
        </span>
        <input
          type="number"
          min={1000}
          step={1000}
          inputMode="numeric"
          value={customAmount}
          onChange={(event) => {
            setCustomAmount(event.target.value);
            setSelectedAmount(null);
          }}
          placeholder="Contoh: 75000"
          className="mt-1 block w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground"
        />
      </label>

      <a
        href={buildWhatsappConfirmationUrl(activeAmount)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
      >
        Sudah Transfer? Konfirmasi via WhatsApp
      </a>
      <p className="mt-2 text-xs text-muted-foreground">
        Tombol ini membuka WhatsApp dengan pesan yang sudah terisi otomatis —
        tinggal lengkapi nama dan kirim.
      </p>
    </div>
  );
}

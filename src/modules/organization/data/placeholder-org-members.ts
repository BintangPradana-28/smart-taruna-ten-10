export interface OrgMemberSummary {
  id: string;
  name: string;
  position: string;
  photoUrl: string | null;
  order: number;
}

// WHY this matches the OrgMember Prisma model field-for-field: same
// reasoning as placeholder-events.ts — swapping this for a real
// prisma.orgMember.findMany() later means only this file changes,
// never the page that renders it.
const ORG_MEMBERS: OrgMemberSummary[] = [
  {
    id: "1",
    name: "Budi Santoso",
    position: "Ketua",
    order: 1,
    photoUrl: null,
  },
  {
    id: "2",
    name: "Siti Rahayu",
    position: "Wakil Ketua",
    order: 2,
    photoUrl: null,
  },
  {
    id: "3",
    name: "Andi Wijaya",
    position: "Sekretaris",
    order: 3,
    photoUrl: null,
  },
  {
    id: "4",
    name: "Dewi Lestari",
    position: "Bendahara",
    order: 4,
    photoUrl: null,
  },
  {
    id: "5",
    name: "Rian Pratama",
    position: "Koordinator Kegiatan",
    order: 5,
    photoUrl: null,
  },
  {
    id: "6",
    name: "Maya Putri",
    position: "Koordinator Humas",
    order: 6,
    photoUrl: null,
  },
];

export function getOrgMembers(): OrgMemberSummary[] {
  return [...ORG_MEMBERS].sort((a, b) => a.order - b.order);
}

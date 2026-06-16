import { HandHeart, Sparkles, Leaf } from "lucide-react";

export const VALUES = [
  {
    icon: HandHeart,
    title: "Cuidado artesanal",
    desc: "Cada detalhe é feito à mão, com calma e dedicação.",
  },
  {
    icon: Sparkles,
    title: "Beleza nos detalhes",
    desc: "Acabamentos delicados que encantam quem recebe.",
  },
  {
    icon: Leaf,
    title: "Curadoria afetiva",
    desc: "Selecionamos peças que carregam significado.",
  },
] as const;

export const STATS = [
  { number: "+2 mil", label: "presentes entregues" },
  { number: "100%",   label: "feito à mão" },
  { number: "5,0",    label: "avaliação dos clientes" },
] as const;

export const wrap = {
  maxWidth: "var(--container-max)",
  margin: "0 auto",
} as const;

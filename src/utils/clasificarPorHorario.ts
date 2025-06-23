export function clasificarPorHorario(horario: string): "desayuno" | "almuerzo" | "merienda" | "cena" {
  if (!horario) return "desayuno";

  const horarioLower = horario.toLowerCase().trim();

  if (horarioLower.includes("desayuno") || horarioLower.includes("mañana")) {
    return "desayuno";
  } else if (horarioLower.includes("almuerzo") || horarioLower.includes("mediodía") || horarioLower.includes("mediodia")) {
    return "almuerzo";
  } else if (horarioLower.includes("merienda") || horarioLower.includes("tarde")) {
    return "merienda";
  } else if (horarioLower.includes("cena") || horarioLower.includes("noche")) {
    return "cena";
  }

  const horaMatch = horarioLower.match(/(\d{1,2}):(\d{2})/);
  if (horaMatch) {
    const hora = parseInt(horaMatch[1]);

    if (hora >= 6 && hora < 11) return "desayuno";
    else if (hora >= 11 && hora < 16) return "almuerzo";
    else if (hora >= 16 && hora < 20) return "merienda";
    else return "cena";
  }

  const soloHora = parseInt(horarioLower);
  if (!isNaN(soloHora)) {
    if (soloHora >= 6 && soloHora < 11) return "desayuno";
    else if (soloHora >= 11 && soloHora < 16) return "almuerzo";
    else if (soloHora >= 16 && soloHora < 20) return "merienda";
    else return "cena";
  }

  return "desayuno";
}
// Mocking the data
const catalogoDados = {
    catalogoOriginal: []
};

for (let i = 0; i < 100; i++) {
    const mod = {
        id: `mod${i}`,
        nome: `Modulo Numero ${i} com Nome Grande Para Testar`,
        aulas: []
    };
    for (let j = 0; j < 500; j++) {
        mod.aulas.push({
            grupo_aula: `Grupo de Aula ${j}`,
            materiais: [
                { titulo: `Material ${j} A`, tipo: 'video', utilizavel: true },
                { titulo: `Material ${j} B`, tipo: 'pdf', utilizavel: true }
            ],
            temArquivos: true
        });
    }
    catalogoDados.catalogoOriginal.push(mod);
}

function runFilterOriginal(query) {
    let total = 0;
    for (const mod of catalogoDados.catalogoOriginal) {
        const aulasFiltradas = mod.aulas.filter(aula => {
            if (query) {
                const matchQuery = aula.grupo_aula.toLowerCase().includes(query) ||
                    mod.nome.toLowerCase().includes(query) ||
                    aula.materiais.some(m => m.titulo.toLowerCase().includes(query));
                if (!matchQuery) return false;
            }
            return true;
        });
        total += aulasFiltradas.length;
    }
    return total;
}

function runFilterOptimized(query) {
    let total = 0;
    for (const mod of catalogoDados.catalogoOriginal) {
        // OPTIMIZATION
        const modNomeLower = query ? mod.nome.toLowerCase() : '';
        const aulasFiltradas = mod.aulas.filter(aula => {
            if (query) {
                const matchQuery = aula.grupo_aula.toLowerCase().includes(query) ||
                    modNomeLower.includes(query) ||
                    aula.materiais.some(m => m.titulo.toLowerCase().includes(query));
                if (!matchQuery) return false;
            }
            return true;
        });
        total += aulasFiltradas.length;
    }
    return total;
}

const iterations = 500;
const query = "testar";

console.time("Original");
for(let i=0; i<iterations; i++) {
    runFilterOriginal(query);
}
console.timeEnd("Original");

console.time("Optimized");
for(let i=0; i<iterations; i++) {
    runFilterOptimized(query);
}
console.timeEnd("Optimized");

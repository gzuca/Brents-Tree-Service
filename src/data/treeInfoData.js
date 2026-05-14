// ─── TREE INFO DATA ───────────────────────────────────────────
export const TREE_INFO = {
  disease: {
    title: "Tree Disease Information",
    sub: "Learn to identify and address common tree diseases in Central Texas",
    sections: [
      { heading: "Oak Wilt", body: "One of the most destructive tree diseases in Texas, Oak Wilt is a fungal disease that affects all species of oak trees. Red oaks are highly susceptible and can die within 3–6 weeks. Live oaks spread the disease through interconnected root systems. Signs include leaf discoloration starting at the tips and rapid defoliation. Treatment involves preventive fungicide injections and severing root connections between infected and healthy trees." },
      { heading: "Hypoxylon Canker", body: "This fungal disease attacks stressed trees, especially oaks and sycamores. Once infected, there is no cure — prevention is key. Keeping trees healthy through proper watering and fertilization reduces risk. Infected trees should be removed promptly. Look for silvery-gray patches appearing under the bark." },
      { heading: "Fire Blight", body: "A bacterial disease primarily affecting fruit trees like apple, pear, and crabapple. Symptoms include wilted, blackened branches that look 'burned.' Prune affected branches well below the visible damage during dry weather. Always disinfect tools between cuts to prevent spread." },
      { heading: "Anthracnose", body: "A fungal disease causing dead, brown areas on leaves, which may curl and fall. Common in sycamores, oaks, and ashes during wet springs. Usually not fatal but weakens trees over time. Proper pruning for airflow and fungicide applications can help manage the disease." },
      { heading: "Ganoderma Root Rot", body: "A serious fungal rot of the roots and base of trees. Shelf-like fruiting bodies (conks) at the base of the trunk are a key sign. Affected trees become structurally unsound and should be evaluated for removal immediately. There is no known cure." },
    ],
  },
  insects: {
    title: "Tree Insect Information",
    sub: "Common tree-damaging insects in Central Texas and how to manage them",
    sections: [
      { heading: "Emerald Ash Borer", body: "A highly destructive beetle that has devastated ash trees across North America. Adult beetles leave D-shaped exit holes; larvae create S-shaped galleries under bark. Early detection and systemic insecticide treatments can save trees if caught in time." },
      { heading: "Texas Leafcutting Ant", body: "These ants strip leaves from trees to grow fungus colonies underground. Large mounds with radiating foraging trails are telltale signs. Damage can defoliate trees in days. Professional baiting programs are most effective for control." },
      { heading: "Aphids", body: "Small, soft-bodied insects that cluster on new growth, sucking sap and excreting sticky honeydew that promotes sooty mold growth. Usually managed with insecticidal soap or by encouraging natural predators like ladybugs. Severe infestations may require professional treatment." },
      { heading: "Scale Insects", body: "Tiny insects that attach to bark and branches, covered by a protective shell. They weaken trees by sucking sap. Signs include yellowing leaves, dieback, and sticky residue. Horticultural oil applications are effective when timed correctly." },
      { heading: "Bagworms", body: "Caterpillars that construct protective bags from plant material, hanging from tree branches. They defoliate trees if populations are large. Hand removal of bags in fall/winter or insecticide applications in early spring are both effective approaches." },
    ],
  },
  trimming: {
    title: "Tree Trimming Information",
    sub: "Everything you need to know about proper tree trimming in Central Texas",
    sections: [
      { heading: "Why Regular Trimming Matters", body: "Regular tree trimming improves tree health by removing dead, diseased, or crossing branches that can spread decay. It also improves safety by eliminating branches that could fall on people, vehicles, or structures, and enhances beauty by maintaining a desirable shape." },
      { heading: "Best Time to Trim in Central Texas", body: "For most trees, late fall through winter (November–February) is ideal — trees are dormant, making cuts less stressful and reducing disease risk. However, dead or hazardous branches should be removed immediately, regardless of season." },
      { heading: "Types of Trimming Cuts", body: "Crown cleaning removes dead, dying, or diseased branches. Crown thinning selectively removes branches to increase light and air movement. Crown raising removes lower branches to provide clearance. Crown reduction decreases overall tree size while maintaining natural form." },
      { heading: "What NOT to Do — Common Mistakes", body: "Avoid 'topping' — the practice of cutting the main trunk or large branches to stubs — as it causes severe stress, creates decay entry points, and produces weakly attached regrowth. Also avoid removing more than 25% of a tree's foliage at one time." },
      { heading: "Oak Wilt Prevention When Trimming", body: "In Texas, NEVER trim oaks from February through June when oak wilt-spreading beetles are most active. If you must trim, immediately paint all cuts with pruning sealer. This simple step can save your oak trees from a potentially fatal disease." },
    ],
  },
  types: {
    title: "Tree Types in Central Texas",
    sub: "Common tree species in the Austin area and how to care for them",
    sections: [
      { heading: "Live Oak (Quercus virginiana)", body: "The iconic tree of Central Texas, live oaks are semi-evergreen with distinctive spreading canopies. They're extremely drought-tolerant once established and can live for centuries. Primary concern: Oak Wilt. Avoid pruning February–June. Deep infrequent watering encourages deep root systems." },
      { heading: "Texas Cedar Elm (Ulmus crassifolia)", body: "The most common native elm in Texas, cedar elms are tough, drought-tolerant shade trees. They're tolerant of Austin's heavy clay soils and intense heat. They turn golden yellow in fall. Susceptible to elm leaf beetle and elm aphid but rarely need treatment." },
      { heading: "Pecan (Carya illinoinensis)", body: "Texas' state tree, pecans are large shade trees that produce edible nuts. They need deep, well-drained soils and regular watering during drought. Susceptible to pecan scab fungus and several insects. Annual fertilization with zinc is often beneficial." },
      { heading: "Bald Cypress (Taxodium distichum)", body: "Often found along Central Texas creeks and rivers, bald cypress are tough, long-lived trees that turn bronze in fall. They tolerate flooding and drought equally well. Their feathery foliage and distinctive 'knees' make them prized landscape specimens." },
      { heading: "Ashe Juniper (Juniperus ashei)", body: "Commonly called 'cedar' in Texas, Ashe juniper is a native shrub/tree that dominates Hill Country landscapes. It's highly drought-tolerant and wildlife-friendly. Many landowners manage it through selective clearing to reduce water competition and cedar fever pollen." },
      { heading: "Monterrey Oak (Quercus polymorpha)", body: "A fast-growing, semi-evergreen oak native to Mexico that thrives in Central Texas heat and alkaline soils. More resistant to Oak Wilt than other oaks. Growing in popularity as a landscape tree for its beauty, adaptability, and rapid growth rate." },
    ],
  },
};

export const TREE_INFO_TOPICS = [
  { slug: "disease",  label: "Tree Disease" },
  { slug: "insects",  label: "Tree Insects" },
  { slug: "trimming", label: "Trimming Guide" },
  { slug: "types",    label: "Tree Types" },
];

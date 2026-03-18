// // DietaContext.ts
// "use client";

// import { createContext, useContext } from "react";
// import UseFormularioDieta from "@/hooks/admin/dieta/clienteDieta/useFormularioDieta";
// import { useDietaCrud } from "@/hooks/admin/dieta/clienteDieta/useDietaCrud";

// import { useRefeicaoCrud } from "@/hooks/admin/dieta/refeicao/useRefeicaoCrud";
// import { useFormularioRefeicao } from "@/hooks/admin/dieta/refeicao/useFormularioRefeicao";

// import { useTipoRefeicaoCrud } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoCrud";
// import { useFormularioTipoRefeicao } from "@/hooks/admin/dieta/tipoRefeicao/useFormularioTipoRefeicao";

// import { useItemRefeicaoCrud } from "@/hooks/admin/dieta/alimentosRefeicao/useCrudItemRefeicao";
// import { useFormularioItemRefeicao } from "@/hooks/admin/dieta/alimentosRefeicao/useFormularioItemRefeicao";

// import { useAlimentoCrud } from "@/hooks/admin/dieta/alimentos/useAlimentoCrud";
// import { useFormularioAlimento } from "@/hooks/admin/dieta/alimentos/useFormularioAlimento";

// import { useCategoriaCrud } from "@/hooks/admin/dieta/categoria/useCategoriaCrud";
// import { useFormularioCategoria } from "@/hooks/admin/dieta/categoria/useFormularioCategoria";

// import { useSubcategoriaCrud } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaCrud";
// import { useFormularioSubcategoria } from "@/hooks/admin/dieta/subcategoria/useFormularioSubcategoria";



// interface DietaContextType {
//   useFormularioDieta: ReturnType<typeof UseFormularioDieta>;
//   dietaCrud: ReturnType<typeof useDietaCrud>;

//   useFormularioRefeicao: ReturnType<typeof useFormularioRefeicao>;
//   refeicaoCrud: ReturnType<typeof useRefeicaoCrud>;

//   tipoRefeicaoCrud: ReturnType<typeof useTipoRefeicaoCrud>;
//   formularioTipoRefeicao: ReturnType<typeof useFormularioTipoRefeicao>;

//   itemRefeicaoCrud: ReturnType<typeof useItemRefeicaoCrud>;
//   formularioItemRefeicao: ReturnType<typeof useFormularioItemRefeicao>;

//   alimentoCrud: ReturnType<typeof useAlimentoCrud>;
//   formularioAlimento: ReturnType<typeof useFormularioAlimento>;

//   formularioCategoria: ReturnType<typeof useFormularioCategoria>;
//   categoriaCrud: ReturnType<typeof useCategoriaCrud>;

//   formularioSubcategoria: ReturnType<typeof useFormularioSubcategoria>;
//   subcategoriaCrud: ReturnType<typeof useSubcategoriaCrud>;
// }

// // Contexto
// const DietaContext = createContext<DietaContextType | null>(null);

// export function DietaProvider({ children }: { children: React.ReactNode }) {
  
//   // Hooks dieta
//   const useFormularioDietaInstance = UseFormularioDieta();
//   const dietaCrudInstance = useDietaCrud(
//     useFormularioDietaInstance.formularioDieta,
//     useFormularioDietaInstance.alterarDadosFormulario,
//     useFormularioDietaInstance.limparFormularioDieta
//   );

//   // Hooks refeição
//   const useFormularioRefeicaoInstance = useFormularioRefeicao();
//   const refeicaoCrudInstance = useRefeicaoCrud(
//     useFormularioRefeicaoInstance.formularioRefeicao,
//     useFormularioRefeicaoInstance.alterarFormularioRefeicao,
//     useFormularioRefeicaoInstance.limparFormularioRefeicao
//   );

//   // Hooks tipo refeição
//   const useFormularioTipoRefeicaoInstance = useFormularioTipoRefeicao();
//   const tipoRefeicaoInstance = useTipoRefeicaoCrud(
//     useFormularioTipoRefeicaoInstance.formularioTipoRefeicao,
//     useFormularioRefeicaoInstance.formularioRefeicao,
//     useFormularioTipoRefeicaoInstance.alterarFormularioTipoRefeicao,
//     useFormularioTipoRefeicaoInstance.limparFormularioTipoRefeicao
//   );

//   // Hooks item refeição (EX: arroz da refeição x)
//   const useFormularioItemRefeicaoInstance = useFormularioItemRefeicao();
//   const itemRefeicaoCrud = useItemRefeicaoCrud(
//     useFormularioItemRefeicaoInstance.formularioItemRefeicao,
//     useFormularioItemRefeicaoInstance.alterarFormularioItemRefeicao,
//     useFormularioItemRefeicaoInstance.limparFormularioItemRefeicao
//   );

//   // Hooks dos alimentos
//   const useFormAlimentoInstance = useFormularioAlimento();
//   const alimentoCrud = useAlimentoCrud(
//     useFormAlimentoInstance.formularioAlimentos,
//     useFormAlimentoInstance.alterarFormularioAlimentos,
//     useFormAlimentoInstance.limparFormularioAlimentos
//   );

//   // hooks das categorias
//   const useFormCategoriaInstance = useFormularioCategoria();
//   const categoriaCrud = useCategoriaCrud(
//     useFormCategoriaInstance.formularioCategoria,
//     useFormCategoriaInstance.alterarFormularioCategoria,
//     useFormCategoriaInstance.limparFormularioCategoria
//   );

//   // Hooks subcategoria
//   const useFormSubcategoriaInstance = useFormularioSubcategoria();
//   const subcategoriaCrud = useSubcategoriaCrud(
//     useFormSubcategoriaInstance.formularioSubcategoria,
//     useFormSubcategoriaInstance.alterarFormularioSubcategoria,
//     useFormSubcategoriaInstance.limparFormularioSubcategoria
//   );

//   return (
//     <DietaContext.Provider
//       value={{
//         useFormularioDieta: useFormularioDietaInstance,
//         dietaCrud: dietaCrudInstance,
//         useFormularioRefeicao: useFormularioRefeicaoInstance,
//         refeicaoCrud: refeicaoCrudInstance,
//         tipoRefeicaoCrud: tipoRefeicaoInstance,
//         formularioTipoRefeicao: useFormularioTipoRefeicaoInstance,
//         formularioItemRefeicao: useFormularioItemRefeicaoInstance,
//         itemRefeicaoCrud: itemRefeicaoCrud,
//         formularioAlimento: useFormAlimentoInstance,
//         alimentoCrud: alimentoCrud,
//         formularioCategoria: useFormCategoriaInstance,
//         categoriaCrud: categoriaCrud,
//         formularioSubcategoria: useFormSubcategoriaInstance,
//         subcategoriaCrud: subcategoriaCrud
//       }}
//     >
//       {children}
//     </DietaContext.Provider>
//   );
// }

// // Hook simples pra consumir
// export const useDietaContext = () => {
//   const context = useContext(DietaContext);
//   if (!context)
//     throw new Error("useDietaContext deve ser usado dentro de DietaProvider");
//   return context;
// };

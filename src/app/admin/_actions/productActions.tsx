import { DropdownLink } from "@/components/Navigation";
import { useTransition } from "react"
import { deleteProduct, toggleAvailable } from "./products";

export function ToggleActiveItem({id, available}: {id: string, available: boolean}){
  const [transitionState, startTransition] = useTransition();
  return <DropdownLink href="/admin/products" disabled={transitionState} onClick={() => {
    startTransition(async () => {
      await toggleAvailable(id, !available);
    });
  }}>
    {available ? "Inaktivera" : "Aktivera"}
  </DropdownLink>
};

export function DeleteItem({id, disabled}: {id: string, disabled: boolean}){
  const [transitionState, startTransition] = useTransition();
  return <DropdownLink href="/admin/products" disabled={disabled || transitionState} onClick={() => {
    startTransition(async () => {
      await deleteProduct(id);
    });
  }}>
    <span className="text-red-600 hover:text-red-900">Radera</span>
  </DropdownLink>
}
 "use client";
 
 import { useMemo, useState } from "react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { useLocale } from "@/hooks/use-locale";
 import { saveTextOverride, getLocalOverride } from "@/lib/supabase";
 import { Pencil, Check, X } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 type EditableMediaProps = {
   type: "image" | "video";
   path: string;
   value: string;
   className?: string;
   render: (srcOrId: string) => React.ReactNode;
 };
 
 export function EditableMedia({ type, path, value, className, render }: EditableMediaProps) {
   const { locale } = useLocale();
   const [editing, setEditing] = useState(false);
   const [draft, setDraft] = useState<string>(value);
   const userRole = useMemo(() => {
     try {
       const raw = localStorage.getItem("user");
       if (!raw) return null;
       const u = JSON.parse(raw);
       return u?.role || null;
     } catch {
       return null;
     }
   }, []);
  const isAdmin = userRole === "super_admin";
 
   const overridden = useMemo(() => {
     const ov = getLocalOverride(locale, path);
     return ov || value;
   }, [locale, path, value]);
 
   const save = () => {
     saveTextOverride(path, locale, draft).finally(() => {
       setEditing(false);
     });
   };
 
   if (!isAdmin) {
     return <div className={className}>{render(overridden)}</div>;
   }
 
   return (
     <div className={cn("relative inline-block", className)}>
       {!editing && (
         <div className="group">
           {render(overridden)}
           <button
             type="button"
             className="absolute top-2 right-2 inline-flex items-center gap-2 bg-black/40 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
             onClick={() => {
               setDraft(overridden);
               setEditing(true);
             }}
             aria-label="Modifier le média"
           >
             <Pencil className="w-4 h-4" />
             <span className="text-xs">{type === "image" ? "Modifier l'image" : "Modifier la vidéo"}</span>
           </button>
         </div>
       )}
       {editing && (
         <div className="absolute top-2 right-2 bg-background border rounded-md p-2 shadow-md flex items-center gap-2">
           <Input
             value={draft}
             onChange={(e) => setDraft(e.target.value)}
             placeholder={type === "image" ? "URL de l'image" : "ID YouTube"}
             className="w-64"
           />
           <Button size="icon" onClick={save}>
             <Check className="w-4 h-4" />
           </Button>
           <Button size="icon" variant="secondary" onClick={() => setEditing(false)}>
             <X className="w-4 h-4" />
           </Button>
         </div>
       )}
     </div>
   );
 }

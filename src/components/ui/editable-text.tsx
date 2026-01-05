 "use client";
 
 import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, X, Pencil } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";
import { saveTextOverride } from "@/lib/supabase";
 
 type Props = {
   path: string;
   value: string;
   className?: string;
   multiline?: boolean;
  html?: boolean;
};
 
 function setNested(obj: any, path: string[], val: any) {
   let cur = obj;
   for (let i = 0; i < path.length - 1; i++) {
     const k = path[i];
     if (typeof cur[k] !== "object" || cur[k] === null || Array.isArray(cur[k])) {
       cur[k] = {};
     }
     cur = cur[k];
   }
   cur[path[path.length - 1]] = val;
   return obj;
 }
 
 export function EditableText({ path, value, className, multiline, html }: Props) {
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
 
  const save = () => {
    saveTextOverride(path, locale, draft).finally(() => {
      setEditing(false);
    });
  };
 
   if (!isAdmin) {
    if (html) {
      return <span className={className} dangerouslySetInnerHTML={{ __html: value }} />;
    }
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={cn("relative inline-block", className)}>
      {!editing && (
        <button
          type="button"
          className="inline-flex items-center gap-2 group"
          onClick={() => {
            setDraft(value);
            setEditing(true);
          }}
        >
          {html ? (
            <span 
              className="group-hover:bg-primary/10 group-hover:rounded px-1" 
              dangerouslySetInnerHTML={{ __html: value }} 
            />
          ) : (
            <span className="group-hover:bg-primary/10 group-hover:rounded px-1">{value}</span>
          )}
          <Pencil className="w-4 h-4 opacity-50 group-hover:opacity-100" />
        </button>
      )}
       {editing && (
         <div className="flex items-start gap-2">
           {multiline ? (
             <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} />
           ) : (
             <Input value={draft} onChange={(e) => setDraft(e.target.value)} />
           )}
           <div className="flex items-center gap-1">
             <Button size="icon" onClick={save}>
               <Check className="w-4 h-4" />
             </Button>
             <Button size="icon" variant="secondary" onClick={() => setEditing(false)}>
               <X className="w-4 h-4" />
             </Button>
           </div>
         </div>
       )}
     </span>
   );
 }

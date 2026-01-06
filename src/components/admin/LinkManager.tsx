import { useState } from "react";
import { useSocialLinks, useDeleteSocialLink, useReorderSocialLinks } from "@/hooks/useSocialLinks";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit, GripVertical, ExternalLink } from "lucide-react";
import LinkForm from "./LinkForm";
import { SocialLink } from "@/hooks/useSocialLinks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LinkManager = () => {
  const { data: links, isLoading } = useSocialLinks(true);
  const deleteLink = useDeleteSocialLink();
  const reorderLinks = useReorderSocialLinks();
  const { toast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteLink.mutateAsync(deleteId);
      toast({
        title: "Sucesso!",
        description: "Link removido com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível remover o link.",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index || !links) return;

    const newLinks = [...links];
    const draggedLink = newLinks[draggedIndex];
    newLinks.splice(draggedIndex, 1);
    newLinks.splice(index, 0, draggedLink);

    // Update display orders
    const updates = newLinks.map((link, i) => ({
      id: link.id,
      display_order: i,
    }));

    reorderLinks.mutate(updates);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (isLoading) {
    return (
      <div className="glass p-6 rounded-2xl flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="glass p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Gerenciar Links</h2>
          <Button 
            onClick={() => {
              setEditingLink(null);
              setShowForm(true);
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Link
          </Button>
        </div>

        {showForm && (
          <LinkForm
            link={editingLink}
            onClose={() => {
              setShowForm(false);
              setEditingLink(null);
            }}
          />
        )}

        <div className="space-y-2">
          {links?.map((link, index) => (
            <div
              key={link.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10
                transition-all cursor-move
                ${draggedIndex === index ? "opacity-50" : ""}
                ${!link.is_active ? "opacity-50" : ""}
              `}
            >
              <GripVertical className="h-5 w-5 text-white/50" />
              
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ background: link.gradient }}
              >
                {link.html_icon ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: link.html_icon }}
                    className="w-6 h-6"
                  />
                ) : link.icon ? (
                  <i className={link.icon} />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate">{link.name}</h3>
                <p className="text-sm text-white/50 truncate">{link.url}</p>
              </div>

              {!link.is_active && (
                <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-300">
                  Inativo
                </span>
              )}

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingLink(link);
                    setShowForm(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteId(link.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            </div>
          ))}

          {links?.length === 0 && (
            <p className="text-center text-white/50 py-8">
              Nenhum link cadastrado. Clique em "Novo Link" para adicionar.
            </p>
          )}
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este link? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LinkManager;

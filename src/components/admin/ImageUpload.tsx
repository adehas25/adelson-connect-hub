import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Link, Image } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImageUploadProps {
  currentUrl: string;
  onUpload: (url: string) => void;
  bucket: "avatars" | "link-logos";
}

const ImageUpload = ({ currentUrl, onUpload, bucket }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma imagem.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onUpload(urlData.publicUrl);
      toast({
        title: "Sucesso!",
        description: "Imagem enviada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar",
        description: error.message || "Não foi possível enviar a imagem.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onUpload(urlInput.trim());
      setUrlInput("");
      toast({
        title: "Sucesso!",
        description: "URL da imagem atualizada.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="w-full bg-white/10">
          <TabsTrigger value="upload" className="flex-1 data-[state=active]:bg-primary">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="flex-1 data-[state=active]:bg-primary">
            <Link className="h-4 w-4 mr-2" />
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Image className="h-4 w-4 mr-2" />
            )}
            {isUploading ? "Enviando..." : "Escolher Imagem"}
          </Button>
        </TabsContent>

        <TabsContent value="url" className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button onClick={handleUrlSubmit} variant="outline">
              Usar
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {currentUrl && (
        <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
          <img
            src={currentUrl}
            alt="Current"
            className="w-10 h-10 rounded object-cover"
          />
          <span className="text-xs text-white/50 truncate flex-1">{currentUrl}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

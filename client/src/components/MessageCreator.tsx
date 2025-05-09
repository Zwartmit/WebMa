import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertGreetingSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useConfetti from "@/hooks/useConfetti";
import { apiRequest } from "@/lib/queryClient";
import { HeartIcon } from "lucide-react";

type MessageCreatorProps = {
  onGreetingGenerated: (greeting: any) => void;
};

// Extend the insert schema with validation
const formSchema = insertGreetingSchema.extend({
  motherName: z.string().min(1, "Por favor ingresa un nombre"),
  message: z.string().min(1, "Por favor ingresa un mensaje"),
  cardStyle: z.string().min(1, "Por favor selecciona un estilo"),
});

const MessageCreator = ({ onGreetingGenerated }: MessageCreatorProps) => {
  const [showCustomMessage, setShowCustomMessage] = useState(false);
  const [previewStyle, setPreviewStyle] = useState("style-1");
  const { triggerConfetti } = useConfetti();
  const { toast } = useToast();

  // Define message templates
  const messageTemplates = [
    { id: "template-1", text: "Gracias por tu amor incondicional y apoyo en cada paso de mi vida." },
    { id: "template-2", text: "Para la mujer que me enseñó lo que significa amar sin límites." },
    { id: "template-3", text: "Tu fortaleza y ternura son mi inspiración diaria." },
    { id: "template-4", text: "No hay palabras suficientes para agradecer todo lo que haces." },
    { id: "custom", text: "Escribir mensaje personalizado" }
  ];

  // Define form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motherName: "",
      message: "",
      cardStyle: "style-1",
      hasMusic: false,
      createdAt: new Date().toISOString(),
    },
  });
  
  const watchedMotherName = form.watch("motherName");
  const watchedMessage = form.watch("message");
  const watchedCardStyle = form.watch("cardStyle");
  
  // Handle template selection
  const handleTemplateChange = (value: string) => {
    if (value === "custom") {
      setShowCustomMessage(true);
      form.setValue("message", "");
    } else {
      setShowCustomMessage(false);
      const selectedTemplate = messageTemplates.find(t => t.id === value);
      if (selectedTemplate) {
        form.setValue("message", selectedTemplate.text);
      }
    }
  };

  // Get styles for preview card based on selected style
  const getCardStyles = () => {
    switch (watchedCardStyle) {
      case "style-1":
        return "bg-gradient-to-r from-primary-light to-secondary-light";
      case "style-2":
        return "bg-gradient-to-r from-secondary to-primary";
      case "style-3":
        return "bg-gradient-to-r from-accent to-primary-light";
      default:
        return "bg-gradient-to-r from-primary-light to-secondary-light";
    }
  };

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      triggerConfetti();
      
      // Only submit to backend if message is valid
      if (data.message.trim() === "") {
        toast({
          title: "Error",
          description: "Por favor ingresa un mensaje para mamá",
          variant: "destructive",
        });
        return;
      }
      
      // Call API to save the greeting
      const response = await apiRequest("POST", "/api/greetings", data);
      
      if (response.ok) {
        // Pass the greeting data to parent component
        onGreetingGenerated(data);
        
        toast({
          title: "¡Tarjeta creada!",
          description: "Tu mensaje especial para mamá está listo",
        });
      }
    } catch (error) {
      console.error("Error creating greeting:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al crear tu mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.section 
      id="crear-mensaje" 
      className="py-8 mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-secondary-light px-6 py-8 text-center">
          <h2 className="font-dancing text-3xl md:text-4xl text-dark-text mb-3">Crea tu mensaje especial</h2>
          <p className="text-dark-text/80 max-w-2xl mx-auto">
            Personaliza un hermoso mensaje para mamá y compártelo directamente o como una tarjeta digital
          </p>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="motherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark-text font-medium">Nombre de mamá</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Escribe su nombre aquí" 
                            className="px-4 py-3 rounded-lg border border-gray-200"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormItem>
                    <FormLabel className="text-dark-text font-medium">Elige un mensaje</FormLabel>
                    <Select onValueChange={handleTemplateChange}>
                      <SelectTrigger className="px-4 py-3 rounded-lg border border-gray-200">
                        <SelectValue placeholder="Selecciona un mensaje pre-escrito o escribe uno personalizado" />
                      </SelectTrigger>
                      <SelectContent>
                        {messageTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                  
                  {showCustomMessage && (
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-dark-text font-medium">Tu mensaje personalizado</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Escribe un mensaje desde el corazón..." 
                              className="px-4 py-3 rounded-lg border border-gray-200"
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={form.control}
                    name="cardStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark-text font-medium">Estilo de tarjeta</FormLabel>
                        <div className="grid grid-cols-3 gap-3">
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="style-1" id="style-1" />
                              <Label 
                                htmlFor="style-1" 
                                className="block h-20 w-20 rounded-lg overflow-hidden cursor-pointer bg-gradient-to-r from-primary-light to-secondary-light"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="style-2" id="style-2" />
                              <Label 
                                htmlFor="style-2" 
                                className="block h-20 w-20 rounded-lg overflow-hidden cursor-pointer bg-gradient-to-r from-secondary to-primary"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="style-3" id="style-3" />
                              <Label 
                                htmlFor="style-3" 
                                className="block h-20 w-20 rounded-lg overflow-hidden cursor-pointer bg-gradient-to-r from-accent to-primary-light"
                              />
                            </div>
                          </RadioGroup>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between mt-8">
                    <FormField
                      control={form.control}
                      name="hasMusic"
                      render={({ field }) => (
                        <FormItem className="flex space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange}
                              id="add-music"
                            />
                          </FormControl>
                          <Label htmlFor="add-music" className="text-dark-text">
                            Incluir música de fondo
                          </Label>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary-light text-dark-text font-semibold py-3 px-6 rounded-full transition-all shadow-md hover:shadow-lg"
                    >
                      <HeartIcon className="mr-2 h-4 w-4" />
                      Generar tarjeta
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            
            <div className="md:w-1/2">
              <motion.div 
                className={`p-8 rounded-xl shadow-lg h-96 flex flex-col justify-center items-center card-hover relative ${getCardStyles()}`}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(248, 193, 216, 0.4), 0 8px 10px -6px rgba(208, 191, 255, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <h3 className="font-dancing text-3xl text-dark-text mb-6">
                    Para {watchedMotherName || "mi querida mamá"}
                  </h3>
                  <p className="text-dark-text/90 mb-6">
                    {watchedMessage || "Selecciona un mensaje o escribe uno personalizado para verlo aquí"}
                  </p>
                  <p className="font-dancing text-xl text-dark-text/80 mt-6">Con todo mi amor</p>
                </div>
                <motion.div 
                  className="absolute bottom-4 right-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <HeartIcon className="text-primary h-6 w-6" />
                </motion.div>
                <div className="absolute top-4 left-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-accent"
                  >
                    <path d="M12 2a9 9 0 0 0-9 9c0 4.17 2.84 7.67 6.69 8.69a.5.5 0 0 0 .62-.45V17.5c-2.5.5-3-1-3-1-.41-1.05-1-1.33-1-1.33-.83-.56.06-.55.06-.55.92.07 1.4.94 1.4.94.8 1.4 2.13 1 2.66.77.08-.59.31-1 .56-1.23-2-.23-4.1-1-4.1-4.44 0-.98.35-1.79.92-2.42-.09-.22-.4-1.13.09-2.35 0 0 .75-.24 2.46.91a8.57 8.57 0 0 1 4.5 0c1.71-1.15 2.46-.91 2.46-.91.49 1.22.18 2.13.09 2.35.57.63.92 1.44.92 2.42 0 3.47-2.11 4.2-4.11 4.42.32.28.6.82.6 1.66v3.3c0 .31.36.54.71.44A8.99 8.99 0 0 0 21 11a9 9 0 0 0-9-9z"/>
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MessageCreator;

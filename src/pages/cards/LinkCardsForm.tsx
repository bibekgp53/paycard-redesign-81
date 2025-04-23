import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup } from "@/components/ui/radio-group";
import { useApolloQuery } from "@/hooks/useApolloQuery";
import { GET_PROFILES, GET_PROFILES_DIRECT } from "@/graphql/profiles";
import { GetProfilesData } from "@/graphql/types";
import { toast } from "@/hooks/use-toast";
import { CardNumberInputs } from "./components/CardNumberInputs";
import { SequenceInputs } from "./components/SequenceInputs";
import { supabase } from "@/integrations/supabase/client";

interface CardField {
  id: string;
  value: string;
}

interface FormData {
  profileNumber: string;
  inputMethod: string;
  cardNumbers: CardField[];
  startSequence: string;
  endSequence: string;
  processedBy: string;
  invoiceNumber: string;
}

const LinkCardsForm = () => {
  const navigate = useNavigate();
  const { data: profilesData, loading: loadingProfiles, error: profilesError, refetch: refetchProfiles } =
    useApolloQuery<GetProfilesData>(GET_PROFILES);

  // Also try the direct query approach as a fallback
  const { data: directProfilesData, loading: loadingDirectProfiles } =
    useApolloQuery(GET_PROFILES_DIRECT, {
      onError: (error) => console.error("Direct profiles query error:", error)
    });

  const [formData, setFormData] = useState<FormData>({
    profileNumber: "",
    inputMethod: "cardNumbers",
    cardNumbers: [{ id: "1", value: "" }],
    startSequence: "",
    endSequence: "",
    processedBy: "",
    invoiceNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileOptions, setProfileOptions] = useState<{ value: string; label: string }[]>([]);
  
  // Debug authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Current auth session:", data.session);
      
      // If no session, try to get profiles directly from the database for testing
      if (!data.session) {
        console.log("No authentication session - trying direct database query");
        try {
          const { data: profilesFromSupabase, error } = await supabase
            .from('profiles')
            .select('*');
          
          console.log("Direct Supabase query results:", { data: profilesFromSupabase, error });
          
          if (profilesFromSupabase?.length) {
            toast({
              title: "Database Access Status",
              description: `Found ${profilesFromSupabase.length} profiles via direct query, but GraphQL query might still fail if not authenticated`,
            });
          }
        } catch (err) {
          console.error("Direct Supabase query error:", err);
        }
      }
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    // Try to use data from either query
    const profiles = profilesData?.profilesCollection?.edges?.map(e => e.node) || 
                   directProfilesData?.profiles || [];
    
    if (profiles.length > 0) {
      console.log("Profiles loaded successfully:", profiles);
      
      const options = profiles.map((profile: any) => ({
        value: profile.profile_number,
        label: `${profile.profile_number} - ${profile.business_name || profile.name || 'Unnamed Profile'}${profile.from_account ? ` (Account: ${profile.from_account})` : ''}`
      }));
      
      setProfileOptions(options);
      
      toast({
        title: "Profiles Loaded",
        description: `Successfully loaded ${options.length} profiles.`,
      });
    } else if (!loadingProfiles && !loadingDirectProfiles) {
      console.warn("No profiles found in either query method");
      
      toast({
        title: "No Profiles Found",
        description: "Please check that profiles exist in the database and RLS policies are configured correctly.",
        variant: "destructive",
      });
      
      // Provide an empty fallback option for testing
      setProfileOptions([
        { value: "TEST001", label: "TEST001 - Test Profile (Demo)" },
        { value: "TEST002", label: "TEST002 - Another Test Profile (Demo)" }
      ]);
    }
  }, [profilesData, directProfilesData, loadingProfiles, loadingDirectProfiles]);

  useEffect(() => {
    if (profilesError) {
      console.error("Profile data error:", profilesError);
      toast({
        title: "Error Loading Profiles",
        description: "Unable to load profiles. Check console for details.",
        variant: "destructive",
      });
    }
  }, [profilesError]);

  const handleProfileChange = (value: string) => {
    setFormData({ ...formData, profileNumber: value });
  };

  const handleInputMethodChange = (value: string) => {
    setFormData({ ...formData, inputMethod: value });
  };

  const handleCardNumberChange = (id: string, value: string) => {
    const updatedCardNumbers = formData.cardNumbers.map((card) =>
      card.id === id ? { ...card, value } : card
    );
    setFormData({ ...formData, cardNumbers: updatedCardNumbers });
  };

  const addCardNumberField = () => {
    const newId = String(formData.cardNumbers.length + 1);
    setFormData({
      ...formData,
      cardNumbers: [...formData.cardNumbers, { id: newId, value: "" }],
    });
  };

  const removeCardNumberField = (id: string) => {
    if (formData.cardNumbers.length > 1) {
      const updatedCardNumbers = formData.cardNumbers.filter(
        (card) => card.id !== id
      );
      setFormData({ ...formData, cardNumbers: updatedCardNumbers });
    }
  };

  const handleSequenceChange = (field: "startSequence" | "endSequence", value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleChange = (field: "processedBy" | "invoiceNumber", value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.profileNumber) {
      newErrors.profileNumber = "Profile number is required";
    }

    if (formData.inputMethod === "cardNumbers") {
      formData.cardNumbers.forEach((card) => {
        if (!card.value) {
          newErrors[`cardNumber-${card.id}`] = "Card number is required";
        } else if (!/^\d+$/.test(card.value)) {
          newErrors[`cardNumber-${card.id}`] = "Card number must contain only digits";
        }
      });
    } else {
      if (!formData.startSequence) {
        newErrors.startSequence = "Start sequence is required";
      } else if (!/^\d+$/.test(formData.startSequence)) {
        newErrors.startSequence = "Start sequence must contain only digits";
      }

      if (!formData.endSequence) {
        newErrors.endSequence = "End sequence is required";
      } else if (!/^\d+$/.test(formData.endSequence)) {
        newErrors.endSequence = "End sequence must contain only digits";
      } else if (
        parseInt(formData.endSequence) <= parseInt(formData.startSequence)
      ) {
        newErrors.endSequence = "End sequence must be greater than start sequence";
      }
    }

    if (!formData.processedBy) {
      newErrors.processedBy = "Processed by is required";
    }

    if (!formData.invoiceNumber) {
      newErrors.invoiceNumber = "Invoice number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      sessionStorage.setItem("linkCardsFormData", JSON.stringify(formData));
      navigate("/cards/link/confirm");
    }
  };

  const handleRefresh = () => {
    refetchProfiles();
    toast({
      title: "Refreshing Profiles",
      description: "Attempting to reload profiles from database..."
    });
  };

  if (loadingProfiles && loadingDirectProfiles) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading profiles...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-paycard-navy">Link Cards</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="flex items-center gap-1"
          >
            Refresh Profiles
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium font-poppins text-paycard-navy mb-1">
              Profile
            </label>
            <Select
              value={formData.profileNumber}
              onValueChange={handleProfileChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={profileOptions.length > 0 ? "Select a profile" : "No profiles available"} />
              </SelectTrigger>
              <SelectContent>
                {profileOptions.length > 0 ? (
                  profileOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>No profiles available</SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.profileNumber && (
              <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{errors.profileNumber}</p>
            )}
          </div>

          <RadioGroup
            label="Input Method"
            name="inputMethod"
            options={[
              { value: "cardNumbers", label: "Card Numbers" },
              { value: "sequenceNumbers", label: "Sequence Numbers" },
            ]}
            value={formData.inputMethod}
            onChange={handleInputMethodChange}
            inline
            className="mb-6"
          />

          {formData.inputMethod === "cardNumbers" ? (
            <CardNumberInputs
              cardNumbers={formData.cardNumbers}
              errors={errors}
              onCardNumberChange={handleCardNumberChange}
              onAddCard={addCardNumberField}
              onRemoveCard={removeCardNumberField}
            />
          ) : (
            <SequenceInputs
              startSequence={formData.startSequence}
              endSequence={formData.endSequence}
              errors={errors}
              onSequenceChange={handleSequenceChange}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium font-poppins text-paycard-navy mb-1">
                Processed By
              </label>
              <Input
                placeholder="Enter name"
                value={formData.processedBy}
                onChange={(e) => handleChange("processedBy", e.target.value)}
                className={`h-10 py-2 text-sm ${errors.processedBy ? "border-paycard-red ring-1 ring-paycard-red" : ""}`}
              />
              {errors.processedBy && (
                <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{errors.processedBy}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium font-poppins text-paycard-navy mb-1">
                Invoice Number
              </label>
              <Input
                placeholder="Enter invoice number"
                value={formData.invoiceNumber}
                onChange={(e) => handleChange("invoiceNumber", e.target.value)}
                className={`h-10 py-2 text-sm ${errors.invoiceNumber ? "border-paycard-red ring-1 ring-paycard-red" : ""}`}
              />
              {errors.invoiceNumber && (
                <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{errors.invoiceNumber}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button type="submit" className="btn-primary">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkCardsForm;

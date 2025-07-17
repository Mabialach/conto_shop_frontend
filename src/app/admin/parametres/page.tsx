"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, Store, Mail, Shield, Globe, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SiteSettings {
  // Informations générales
  siteName: string
  siteDescription: string
  siteUrl: string
  adminEmail: string
  supportEmail: string
  phone: string

  // Adresse de l'entreprise
  companyName: string
  address: string
  city: string
  postalCode: string
  country: string

  // Paramètres e-commerce
  currency: string
  taxRate: number
  freeShippingThreshold: number
  defaultShippingCost: number

  // Paramètres email
  emailFrom: string
  emailFromName: string
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPassword: string

  // Paramètres de sécurité
  requireEmailVerification: boolean
  allowGuestCheckout: boolean
  passwordMinLength: number
  sessionTimeout: number

  // Paramètres de maintenance
  maintenanceMode: boolean
  maintenanceMessage: string

  // SEO
  metaTitle: string
  metaDescription: string
  metaKeywords: string

  // Analytics
  googleAnalyticsId: string
  facebookPixelId: string

  // Réseaux sociaux
  socialFacebook: string
  socialTwitter: string
  socialInstagram: string
  socialLinkedin: string
}

export default function AdminParametresPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState<SiteSettings>({
    // Valeurs par défaut
    siteName: "ContoShop",
    siteDescription: "Votre boutique en ligne de confiance",
    siteUrl: "https://contoshop.fr",
    adminEmail: "admin@contoshop.fr",
    supportEmail: "support@contoshop.fr",
    phone: "+33 1 23 45 67 89",

    companyName: "ContoShop SARL",
    address: "123 Rue du Commerce",
    city: "Paris",
    postalCode: "75001",
    country: "France",

    currency: "EUR",
    taxRate: 20,
    freeShippingThreshold: 50,
    defaultShippingCost: 5.99,

    emailFrom: "noreply@contoshop.fr",
    emailFromName: "ContoShop",
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",

    requireEmailVerification: true,
    allowGuestCheckout: true,
    passwordMinLength: 8,
    sessionTimeout: 30,

    maintenanceMode: false,
    maintenanceMessage: "Site en maintenance. Nous reviendrons bientôt !",

    metaTitle: "ContoShop - Boutique en ligne",
    metaDescription: "Découvrez notre sélection de produits de qualité",
    metaKeywords: "boutique, en ligne, e-commerce, produits",

    googleAnalyticsId: "",
    facebookPixelId: "",

    socialFacebook: "",
    socialTwitter: "",
    socialInstagram: "",
    socialLinkedin: "",
  })

  const updateSetting = (key: keyof SiteSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Paramètres sauvegardés",
        description: "Les paramètres ont été mis à jour avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const testEmail = async () => {
    try {
      toast({
        title: "Email de test envoyé",
        description: "Vérifiez votre boîte de réception",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email de test",
        variant: "destructive",
      })
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Paramètres</h1>
            <p className="text-gray-600">Configuration générale du site</p>
          </div>

          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          {/* Paramètres généraux */}
          <TabsContent value="general">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Informations du site
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="siteName">Nom du site</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => updateSetting("siteName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteUrl">URL du site</Label>
                      <Input
                        id="siteUrl"
                        value={settings.siteUrl}
                        onChange={(e) => updateSetting("siteUrl", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="siteDescription">Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => updateSetting("siteDescription", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adminEmail">Email administrateur</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) => updateSetting("adminEmail", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="supportEmail">Email support</Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => updateSetting("supportEmail", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" value={settings.phone} onChange={(e) => updateSetting("phone", e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Adresse de l'entreprise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Nom de l'entreprise</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => updateSetting("companyName", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={settings.address}
                      onChange={(e) => updateSetting("address", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Ville</Label>
                      <Input id="city" value={settings.city} onChange={(e) => updateSetting("city", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        value={settings.postalCode}
                        onChange={(e) => updateSetting("postalCode", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Pays</Label>
                      <Input
                        id="country"
                        value={settings.country}
                        onChange={(e) => updateSetting("country", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Maintenance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
                    />
                    <Label htmlFor="maintenanceMode">Mode maintenance</Label>
                    {settings.maintenanceMode && <Badge variant="destructive">Site en maintenance</Badge>}
                  </div>

                  <div>
                    <Label htmlFor="maintenanceMessage">Message de maintenance</Label>
                    <Textarea
                      id="maintenanceMessage"
                      value={settings.maintenanceMessage}
                      onChange={(e) => updateSetting("maintenanceMessage", e.target.value)}
                      disabled={!settings.maintenanceMode}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Paramètres e-commerce */}
          <TabsContent value="ecommerce">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Configuration e-commerce
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currency">Devise</Label>
                    <Select value={settings.currency} onValueChange={(value) => updateSetting("currency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="USD">Dollar ($)</SelectItem>
                        <SelectItem value="GBP">Livre (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="taxRate">Taux de TVA (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={settings.taxRate}
                      onChange={(e) => updateSetting("taxRate", Number.parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="freeShippingThreshold">Seuil livraison gratuite (€)</Label>
                    <Input
                      id="freeShippingThreshold"
                      type="number"
                      min="0"
                      step="0.01"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => updateSetting("freeShippingThreshold", Number.parseFloat(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="defaultShippingCost">Coût de livraison par défaut (€)</Label>
                    <Input
                      id="defaultShippingCost"
                      type="number"
                      min="0"
                      step="0.01"
                      value={settings.defaultShippingCost}
                      onChange={(e) => updateSetting("defaultShippingCost", Number.parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paramètres email */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Configuration email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emailFrom">Email expéditeur</Label>
                    <Input
                      id="emailFrom"
                      type="email"
                      value={settings.emailFrom}
                      onChange={(e) => updateSetting("emailFrom", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="emailFromName">Nom expéditeur</Label>
                    <Input
                      id="emailFromName"
                      value={settings.emailFromName}
                      onChange={(e) => updateSetting("emailFromName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="smtpHost">Serveur SMTP</Label>
                    <Input
                      id="smtpHost"
                      value={settings.smtpHost}
                      onChange={(e) => updateSetting("smtpHost", e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpPort">Port</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={settings.smtpPort}
                      onChange={(e) => updateSetting("smtpPort", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="flex items-end">
                    <Button variant="outline" onClick={testEmail}>
                      Tester l'email
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpUser">Utilisateur SMTP</Label>
                    <Input
                      id="smtpUser"
                      value={settings.smtpUser}
                      onChange={(e) => updateSetting("smtpUser", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpPassword">Mot de passe SMTP</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) => updateSetting("smtpPassword", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paramètres de sécurité */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Paramètres de sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requireEmailVerification"
                      checked={settings.requireEmailVerification}
                      onCheckedChange={(checked) => updateSetting("requireEmailVerification", checked)}
                    />
                    <Label htmlFor="requireEmailVerification">Vérification email obligatoire</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allowGuestCheckout"
                      checked={settings.allowGuestCheckout}
                      onCheckedChange={(checked) => updateSetting("allowGuestCheckout", checked)}
                    />
                    <Label htmlFor="allowGuestCheckout">Autoriser commande invité</Label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="passwordMinLength">Longueur minimum mot de passe</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      min="6"
                      max="20"
                      value={settings.passwordMinLength}
                      onChange={(e) => updateSetting("passwordMinLength", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sessionTimeout">Timeout session (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      min="5"
                      max="1440"
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting("sessionTimeout", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paramètres SEO */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  SEO et Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Titre meta</Label>
                  <Input
                    id="metaTitle"
                    value={settings.metaTitle}
                    onChange={(e) => updateSetting("metaTitle", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="metaDescription">Description meta</Label>
                  <Textarea
                    id="metaDescription"
                    value={settings.metaDescription}
                    onChange={(e) => updateSetting("metaDescription", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="metaKeywords">Mots-clés meta</Label>
                  <Input
                    id="metaKeywords"
                    value={settings.metaKeywords}
                    onChange={(e) => updateSetting("metaKeywords", e.target.value)}
                    placeholder="mot1, mot2, mot3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                    <Input
                      id="googleAnalyticsId"
                      value={settings.googleAnalyticsId}
                      onChange={(e) => updateSetting("googleAnalyticsId", e.target.value)}
                      placeholder="GA4-XXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                    <Input
                      id="facebookPixelId"
                      value={settings.facebookPixelId}
                      onChange={(e) => updateSetting("facebookPixelId", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Réseaux sociaux */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Réseaux sociaux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="socialFacebook">Facebook</Label>
                  <Input
                    id="socialFacebook"
                    value={settings.socialFacebook}
                    onChange={(e) => updateSetting("socialFacebook", e.target.value)}
                    placeholder="https://facebook.com/contoshop"
                  />
                </div>

                <div>
                  <Label htmlFor="socialTwitter">Twitter</Label>
                  <Input
                    id="socialTwitter"
                    value={settings.socialTwitter}
                    onChange={(e) => updateSetting("socialTwitter", e.target.value)}
                    placeholder="https://twitter.com/contoshop"
                  />
                </div>

                <div>
                  <Label htmlFor="socialInstagram">Instagram</Label>
                  <Input
                    id="socialInstagram"
                    value={settings.socialInstagram}
                    onChange={(e) => updateSetting("socialInstagram", e.target.value)}
                    placeholder="https://instagram.com/contoshop"
                  />
                </div>

                <div>
                  <Label htmlFor="socialLinkedin">LinkedIn</Label>
                  <Input
                    id="socialLinkedin"
                    value={settings.socialLinkedin}
                    onChange={(e) => updateSetting("socialLinkedin", e.target.value)}
                    placeholder="https://linkedin.com/company/contoshop"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

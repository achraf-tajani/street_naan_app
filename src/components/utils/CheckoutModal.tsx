import React, { useState } from 'react';
import { X, CreditCard, MapPin, User, Phone, Mail, Lock, Calendar, Shield } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { state, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  // Form states
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    instructions: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveCard: false
  });

  const deliveryFee = deliveryMethod === 'delivery' ? 2.50 : 0;
  const serviceFee = 1.00;
  const totalWithFees = state.totalPrice + deliveryFee + serviceFee;

  const steps = [
    { id: 1, title: deliveryMethod === 'delivery' ? 'Livraison' : 'Récupération', icon: MapPin },
    { id: 2, title: 'Paiement', icon: CreditCard },
    { id: 3, title: 'Confirmation', icon: Shield }
  ];

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deliveryMethod === 'pickup' || validateDeliveryForm()) {
      setCurrentStep(2);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      setCurrentStep(3);
    }
  };

  const handleFinalOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate order number
    const orderNum = `FH${Date.now().toString().slice(-6)}`;
    setOrderNumber(orderNum);
    setOrderComplete(true);
    setIsProcessing(false);
    
    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  const validateDeliveryForm = () => {
    if (deliveryMethod === 'pickup') {
      return deliveryInfo.firstName && deliveryInfo.lastName && 
             deliveryInfo.email && deliveryInfo.phone;
    }
    return deliveryInfo.firstName && deliveryInfo.lastName && 
           deliveryInfo.email && deliveryInfo.phone && 
           deliveryInfo.address && deliveryInfo.city && 
           deliveryInfo.postalCode;
  };

  const validatePaymentForm = () => {
    return paymentInfo.cardNumber.length >= 16 && 
           paymentInfo.expiryDate && paymentInfo.cvv && 
           paymentInfo.cardName;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!isOpen) return null;

  if (orderComplete) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-4">
            Commande Confirmée !
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Votre commande #{orderNumber} a été confirmée et sera {deliveryMethod === 'delivery' ? 'livrée dans 25-35 minutes' : 'prête pour récupération dans 15-20 minutes'}.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-gray-900 dark:text-white font-semibold">
              Total payé: {totalWithFees.toFixed(2)}€
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {deliveryMethod === 'delivery' 
                ? `Livraison à: ${deliveryInfo.address}, ${deliveryInfo.city}`
                : 'À récupérer au: 123 Rue de la Paix, 75001 Paris'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-gray-900 dark:text-white text-2xl font-bold">Finaliser la commande</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Forms */}
          <div className="flex-1 p-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.id 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      currentStep > step.id 
                        ? 'bg-green-500' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Delivery Information */}
            {currentStep === 1 && (
              <form onSubmit={handleDeliverySubmit} className="space-y-6">
                {/* Delivery Method Selection */}
                <div className="mb-6">
                  <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-4">
                    Mode de récupération
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        deliveryMethod === 'delivery'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          deliveryMethod === 'delivery' 
                            ? 'border-green-500 bg-green-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {deliveryMethod === 'delivery' && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        <div className="text-left">
                          <h4 className="text-gray-900 dark:text-white font-semibold">🚚 Livraison</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">25-35 min • +2,50€</p>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        deliveryMethod === 'pickup'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          deliveryMethod === 'pickup' 
                            ? 'border-green-500 bg-green-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {deliveryMethod === 'pickup' && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        <div className="text-left">
                          <h4 className="text-gray-900 dark:text-white font-semibold">🏪 À emporter</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">15-20 min • Gratuit</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-500" />
                  Informations {deliveryMethod === 'delivery' ? 'de livraison' : 'de contact'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Prénom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={deliveryInfo.firstName}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, firstName: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Nom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={deliveryInfo.lastName}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, lastName: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={deliveryInfo.email}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={deliveryInfo.phone}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="06 12 34 56 78"
                        required
                      />
                    </div>
                  </div>
                </div>

                {deliveryMethod === 'delivery' && (
                  <>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        Adresse *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={deliveryInfo.address}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="123 Rue de la Paix"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                          Ville *
                        </label>
                        <input
                          type="text"
                          value={deliveryInfo.city}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Paris"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                          Code postal *
                        </label>
                        <input
                          type="text"
                          value={deliveryInfo.postalCode}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, postalCode: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="75001"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                        Instructions de livraison (optionnel)
                      </label>
                      <textarea
                        value={deliveryInfo.instructions}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, instructions: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Étage, code d'accès, etc."
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {deliveryMethod === 'pickup' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">📍 Adresse du restaurant</h4>
                    <div className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                      <p><strong>Naan Street</strong></p>
                      <p>123 Rue de la Paix</p>
                      <p>75001 Paris</p>
                      <p>📞 01 23 45 67 89</p>
                      <p className="mt-2 font-medium">
                        🕒 Horaires: Lun-Dim 11h00-23h00
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  {deliveryMethod === 'delivery' ? 'Continuer vers le paiement' : 'Confirmer et payer'}
                </button>
              </form>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-500" />
                  Informations de paiement
                </h3>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                      Paiement sécurisé SSL 256-bit
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Numéro de carte *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: formatCardNumber(e.target.value)})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Date d'expiration *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: formatExpiryDate(e.target.value)})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="MM/AA"
                        maxLength={5}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      CVV *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value.replace(/\D/g, '')})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Nom sur la carte *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={paymentInfo.saveCard}
                    onChange={(e) => setPaymentInfo({...paymentInfo, saveCard: e.target.checked})}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="saveCard" className="ml-2 text-gray-700 dark:text-gray-300 text-sm">
                    Sauvegarder cette carte pour les prochaines commandes
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continuer
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Confirmation de commande
                </h3>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
                  <h4 className="text-gray-900 dark:text-white font-semibold">
                    {deliveryMethod === 'delivery' ? 'Livraison' : 'Récupération'}
                  </h4>
                  <div className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                    <p>{deliveryInfo.firstName} {deliveryInfo.lastName}</p>
                    {deliveryMethod === 'delivery' ? (
                      <>
                        <p>{deliveryInfo.address}</p>
                        <p>{deliveryInfo.city}, {deliveryInfo.postalCode}</p>
                      </>
                    ) : (
                      <>
                        <p>À récupérer au restaurant</p>
                        <p>123 Rue de la Paix, 75001 Paris</p>
                      </>
                    )}
                    <p>{deliveryInfo.phone}</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
                  <h4 className="text-gray-900 dark:text-white font-semibold">Paiement</h4>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                    <p>{paymentInfo.cardName}</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleFinalOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Traitement...
                      </>
                    ) : (
                      `Payer ${totalWithFees.toFixed(2)}€`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:w-96 bg-gray-50 dark:bg-gray-900 p-6 border-l border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">Récapitulatif</h3>
            
            <div className="space-y-3 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.emoji}</span>
                    <div>
                      <p className="text-gray-900 dark:text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Qté: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {item.total.toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Sous-total</span>
                <span>{state.totalPrice.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{deliveryMethod === 'delivery' ? 'Livraison' : 'Récupération'}</span>
                <span>{deliveryMethod === 'delivery' ? `${deliveryFee.toFixed(2)}€` : 'Gratuit'}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Frais de service</span>
                <span>{serviceFee.toFixed(2)}€</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <div className="flex justify-between text-gray-900 dark:text-white font-bold text-lg">
                  <span>Total</span>
                  <span>{totalWithFees.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                {deliveryMethod === 'delivery' 
                  ? '🚚 Livraison estimée: 25-35 minutes'
                  : '🏪 Prêt pour récupération: 15-20 minutes'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
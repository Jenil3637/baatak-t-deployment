

import React, { useState } from 'react';
import { useCart } from './CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import axios from 'axios'; // Import axios
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AddToCart = () => {
  const { cart, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: ''
  });

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const gst = subtotal * 0.18;
    return {
      subtotal,
      gst,
      total: subtotal + gst,
      totalQuantity: cart.reduce((total, item) => total + item.quantity, 0), // Calculate total quantity
    };
  };

  const { subtotal, gst, total, totalQuantity } = calculateTotal();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    try {
      // Prepare the data in the required format
      const orderData = {
        user: formData.name, // user is the name provided in the form
        phoneNumber: formData.phoneNumber, // phone number added to the orderData
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalQuantity,
        totalPrice: total.toFixed(2), 
      };

      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/customer/cart`, orderData);


      console.log('Order submitted:', orderData); 

      // Close the dialog and reset form
      setIsDialogOpen(false);
      setFormData({ name: '',phoneNumber: '' });
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-4 sm:px-6 sm:py-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 transition-all duration-300 ease-in-out">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center animate-fade-in">
            <p className="text-gray-600 text-lg">Your cart is empty!</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="w-full bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideIn 0.3s ease-out forwards'
                }}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        {item.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200"
                      >
                        <FaMinus className="w-2 h-2 sm:w-3 sm:h-3 text-gray-600" />
                      </button>

                      <span className="w-6 sm:w-8 text-center text-sm sm:text-base text-gray-800 font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200"
                      >
                        <FaPlus className="w-2 h-2 sm:w-3 sm:h-3 text-gray-600" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mt-4 sm:mt-6 transform transition-all duration-300 ease-in-out hover:shadow-lg">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between text-sm sm:text-base font-semibold text-gray-800">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full mt-4 transition-transform duration-200 active:scale-[0.98]"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-[90%] max-w-md mx-auto rounded-lg p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl text-center">Complete Your Order</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="h-9 sm:h-10 text-sm sm:text-base placeholder:text-gray-400"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="h-9 sm:h-10 text-sm sm:text-base placeholder:text-gray-400"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <DialogFooter className="flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full sm:w-auto relative"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Complete Order'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddToCart;

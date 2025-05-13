import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface BasketItem {
  id: string;
  colorName: string;
  capacitySize: string;
  price: number;
}

interface BasketContextType {
  items: BasketItem[];
  addToBasket: (item: BasketItem) => Promise<void>;
  removeFromBasket: (id: string) => Promise<void>;
  isInBasket: (id: string) => boolean;
  itemCount: number;
  isLoading: boolean;
  error: string | null;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchBasketItems = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setItems([]);
        setIsLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('basket_items')
        .select(`
          id,
          color_name,
          capacity_size,
          phones (
            device_name,
            phone_capacities (
              size,
              price
            )
          )
        `)
        .eq('user_id', user.id);

      if (fetchError) throw fetchError;

      const formattedItems = data?.map(item => ({
        id: item.phones[0]?.device_name,
        colorName: item.color_name,
        capacitySize: item.capacity_size,
        price: item.phones[0]?.phone_capacities.find(
          (c: any) => c.size === item.capacity_size
        )?.price || 0
      })) || [];

      setItems(formattedItems);
    } catch (err) {
      console.error('Error fetching basket:', err);
      setError('Failed to load basket items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBasketItems();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        fetchBasketItems();
      } else if (event === 'SIGNED_OUT') {
        setItems([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addToBasket = async (item: BasketItem) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: phoneData } = await supabase
        .from('phones')
        .select('id')
        .eq('device_name', item.id)
        .single();

      if (!phoneData) throw new Error('Phone not found');

      const { error: insertError } = await supabase
        .from('basket_items')
        .insert({
          user_id: user.id,
          phone_id: phoneData.id,
          color_name: item.colorName,
          capacity_size: item.capacitySize
        });

      if (insertError) throw insertError;

      await fetchBasketItems();
    } catch (err) {
      console.error('Error adding to basket:', err);
      setError('Failed to add item to basket');
    }
  };

  const removeFromBasket = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      const { error: deleteError } = await supabase
        .from('basket_items')
        .delete()
        .eq('user_id', user.id)
        .eq('phone_id', (
          await supabase
            .from('phones')
            .select('id')
            .eq('device_name', id)
            .single()
        ).data?.id);

      if (deleteError) throw deleteError;

      await fetchBasketItems();
    } catch (err) {
      console.error('Error removing from basket:', err);
      setError('Failed to remove item from basket');
    }
  };

  const isInBasket = (id: string) => {
    return items.some(item => item.id === id);
  };

  return (
    <BasketContext.Provider value={{
      items,
      addToBasket,
      removeFromBasket,
      isInBasket,
      itemCount: items.length,
      isLoading,
      error
    }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};
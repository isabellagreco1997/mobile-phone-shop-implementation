import { supabase } from '../lib/supabase';
import { Phone, ColorOption, DataOption } from '../types';
import { handleSupabaseError } from '../utils/errorHandler';

export async function getPhones(): Promise<Phone[]> {
  try {
    console.log('Fetching phones from database...');
    const { data: phones, error: phonesError } = await supabase
      .from('phones')
      .select(`
        id,
        device_name,
        brand,
        monthly_price,
        is_five_g,
        stock,
        phone_colors (
          id,
          name,
          hex,
          image_url
        ),
        phone_capacities (
          id,
          size,
          price
        )
      `);

    if (phonesError) {
      console.error('Error fetching phones:', phonesError);
      throw handleSupabaseError(phonesError);
    }
    
    console.log('Raw phones data:', phones);

    if (!phones) {
      console.log('No phones data returned');
      return [];
    }

    const mappedPhones = phones.map(phone => ({
      deviceName: phone.device_name,
      brand: phone.brand,
      colourOptions: phone.phone_colors.map((color: any) => ({
        name: color.name,
        hex: color.hex,
        imageUrl: color.image_url
      })),
      dataOptions: phone.phone_capacities.map((capacity: any) => ({
        name: capacity.size,
        price: capacity.price
      })),
      pricing: {
        monthly: phone.monthly_price
      },
      stock: phone.stock,
      isFiveG: phone.is_five_g
    }));

    console.log('Mapped phones:', mappedPhones);
    return mappedPhones;
  } catch (error) {
    console.error('Error in getPhones:', error);
    throw error;
  }
}

export async function getPhoneByName(deviceName: string): Promise<Phone | null> {
  try {
    console.log('Fetching phone by name:', deviceName);
    const formattedDeviceName = deviceName.replace(/-/g, ' ').trim();

    const { data: phone, error: phoneError } = await supabase
      .from('phones')
      .select(`
        id,
        device_name,
        brand,
        monthly_price,
        is_five_g,
        stock,
        phone_colors (
          id,
          name,
          hex,
          image_url
        ),
        phone_capacities (
          id,
          size,
          price
        )
      `)
      .ilike('device_name', `%${formattedDeviceName}%`)
      .single();

    if (phoneError) {
      console.error('Error fetching phone:', phoneError);
      throw handleSupabaseError(phoneError);
    }
    
    if (!phone) {
      console.warn('No phone found with name:', formattedDeviceName);
      return null;
    }

    console.log('Found phone:', phone);
    return {
      deviceName: phone.device_name,
      brand: phone.brand,
      colourOptions: phone.phone_colors.map((color: any) => ({
        name: color.name,
        hex: color.hex,
        imageUrl: color.image_url
      })),
      dataOptions: phone.phone_capacities.map((capacity: any) => ({
        name: capacity.size,
        price: capacity.price
      })),
      pricing: {
        monthly: phone.monthly_price
      },
      stock: phone.stock,
      isFiveG: phone.is_five_g
    };
  } catch (error) {
    console.error('Error in getPhoneByName:', error);
    throw error;
  }
}
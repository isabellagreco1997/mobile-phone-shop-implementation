import { supabase } from '../lib/supabase';
import { Phone, ColorOption, DataOption } from '../types';
import { handleSupabaseError } from '../utils/errorHandler';

export async function getPhones(): Promise<Phone[]> {
  try {
    const { data: phones, error: phonesError } = await supabase
      .from('phones')
      .select(`
        *,
        phone_colors (
          name,
          hex,
          image_url
        ),
        phone_capacities (
          size,
          price
        )
      `);

    if (phonesError) throw handleSupabaseError(phonesError);
    if (!phones) throw new Error('No phones found');

    return phones.map(phone => ({
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
  } catch (error) {
    console.error('Error fetching phones:', error);
    throw error;
  }
}

export async function getPhoneByName(deviceName: string): Promise<Phone | null> {
  try {
    // Convert URL format to database format (replace hyphens with spaces)
    const formattedDeviceName = deviceName.replace(/-/g, ' ').trim();

    const { data: phone, error: phoneError } = await supabase
      .from('phones')
      .select(`
        *,
        phone_colors (
          name,
          hex,
          image_url
        ),
        phone_capacities (
          size,
          price
        )
      `)
      .ilike('device_name', `%${formattedDeviceName}%`)
      .single();

    if (phoneError) throw handleSupabaseError(phoneError);
    if (!phone) return null;

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
    console.error('Error fetching phone:', error);
    throw error;
  }
}
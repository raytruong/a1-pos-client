import { readonly, ref } from 'vue';
import { container } from 'tsyringe';
import ItemService from '@/lib/services/ItemService';

export default () => {
    // data
    const loading = ref(false);
    const payload = ref();

    // methods
    const getAllItems = async () => {
        loading.value = true;
        const res = container.resolve(ItemService);
        payload.value = await res.getAllItems();
    };

    // exposed
    return {
        payload: readonly(payload),
        loading: readonly(loading),
        getAllItems,
    };
};

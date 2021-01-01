import { initDb } from '../../../tests/utils/db';
import { upsertProduct, getProductById } from '../product';

describe('upsertProduct', () => {
  initDb();

  it('Should create a new product', async () => {
    await upsertProduct({
      publicId: '13',
      title: 'What a product',
      price: 12.99,
      description: 'This is the most amazing product ever!',
      category: 'Watches',
      image: 'http://www.test.com/image.jpg',
    });
    const upsertedProduct = await getProductById('13');
    expect(upsertedProduct).toMatchObject({
      _id: expect.any(String),
      publicId: '13',
    });
  });
  it('Should update a exists product', async () => {
    await upsertProduct({
      publicId: '13',
      title: 'What a product',
      price: 12.99,
      description: 'This is the most amazing product ever!',
      category: 'Watches',
      image: 'http://www.test.com/image.jpg',
    });
    const upsertedProduct = await getProductById('13');
    expect(upsertedProduct).toMatchObject({
      _id: expect.any(String),
      publicId: '13',
      image: 'http://www.test.com/image.jpg',
    });
  });
});

import { rest } from 'msw'
import { Category, Product } from '~/utils/types'

export const handlers = [
  rest.get<Category[]>('https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/categories', (_req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Oils', order: 100 },
        { name: 'Cleanser', order: 200 },
        { name: 'Actives', order: 300 },
        { name: 'Lotion', order: 400 },
        { name: 'Mask', order: 500 },
        { name: 'Sunscreen', order: 600 },
        { name: 'Haircare', order: 700 },
        { name: 'Exfoliator', order: 800 },
      ]),
    )
  }),

  rest.get<Product[]>('https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/products', (_req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: 'Product 1',
          description:
            'Deserunt hic laudantium molestias. Dolores nam harum repudiandae praesentium facere labore. Ut accusamus amet illo sed alias suscipit.',
          image: 'https://loremflickr.com/600/600?lock=5274160716578816',
          price: 386,
          category: {
            name: 'Haircare',
            order: 700,
          },
        },
        {
          id: 2,
          name: 'Product 2',
          description:
            'Vitae voluptates ullam. Distinctio omnis ad possimus nesciunt voluptatum delectus ducimus. Quae magnam numquam sequi sint occaecati enim quod quas hic.',
          image: 'https://picsum.photos/seed/S3QRJQC/600/600',
          price: 488,
          category: {
            name: 'Actives',
            order: 300,
          },
        },
        {
          id: 3,
          name: 'Product 3',
          description:
            'Commodi recusandae porro perspiciatis distinctio aliquid dolore ut eius. Magni quibusdam a earum. Magni laudantium nemo veniam rem.\nDolorem vel commodi beatae at provident. Ratione sapiente consequuntur consectetur commodi deleniti voluptates saepe molestias commodi. Illum reiciendis magni.\nTempora esse eius vero. Animi aperiam odio. Fugiat voluptate molestiae iusto amet.',
          image: 'https://picsum.photos/seed/3VHmA/600/600',
          price: 106,
          category: {
            name: 'Mask',
            order: 500,
          },
        },
        {
          id: 4,
          name: 'Product 4',
          description:
            'Quod temporibus temporibus et. Sunt esse aliquam non animi vero quod expedita. Vel doloremque fugiat laboriosam fugiat dolor aliquam.',
          image: 'https://loremflickr.com/600/600?lock=5831065184763904',
          price: 486,
          category: {
            name: 'Sunscreen',
            order: 600,
          },
        },
        {
          id: 5,
          name: 'Product 5',
          description:
            'Reprehenderit temporibus voluptates quis tempore pariatur eos doloribus molestias mollitia. Laudantium voluptate enim consequatur consequatur. Officiis eum eveniet veritatis animi incidunt.\nMolestiae sapiente explicabo inventore in. Molestiae accusamus maxime in corporis dolore perferendis. Illo debitis aliquam.\nVitae unde labore. Facere dolorum vel eaque aperiam. Facilis accusantium cupiditate sit provident tempora dolore doloremque ipsam.',
          image: 'https://loremflickr.com/600/600?lock=8358235060830208',
          price: 418,
          category: {
            name: 'Mask',
            order: 500,
          },
        },
        {
          id: 6,
          name: 'Product 6',
          description:
            'Occaecati perspiciatis nostrum nisi. Quia veritatis eius quod mollitia praesentium magnam vero. Animi molestiae unde ut autem sequi adipisci.\nUnde maiores soluta nobis eligendi alias error excepturi debitis. Voluptatibus qui non eligendi ex quisquam voluptatem possimus eaque. Molestias at ipsum rem autem itaque eaque dolorum quo.\nTenetur totam at ad tenetur. Atque repellendus facilis quo suscipit. Voluptas maxime voluptates officia esse delectus quos quasi in aliquid.',
          image: 'https://loremflickr.com/600/600?lock=6111215449276416',
          price: 452,
          category: {
            name: 'Sunscreen',
            order: 600,
          },
        },
        {
          id: 7,
          name: 'Product 7',
          description:
            'Repellat odit corporis optio. Distinctio corporis blanditiis laborum. Voluptatibus deserunt aut impedit quod.',
          image: 'https://picsum.photos/seed/nhHIlm/600/600',
          price: 114,
          category: {
            name: 'Actives',
            order: 300,
          },
        },
        {
          id: 8,
          name: 'Product 8',
          description:
            'Id eligendi officia nostrum molestias animi quia voluptatum. Beatae excepturi necessitatibus aliquam adipisci inventore. Ad sed excepturi ea reprehenderit dolore.\nQuasi voluptatibus quisquam vero quibusdam corporis corrupti. Repellat vitae odio repellendus dolore ex occaecati deleniti. Fugit modi eum dolorem voluptate laudantium.\nEx voluptate nihil tempore. Fugit odio iure. Alias cum iste sit alias soluta cum quasi.',
          image: 'https://loremflickr.com/600/600?lock=7121857276805120',
          price: 366,
          category: {
            name: 'Sunscreen',
            order: 600,
          },
        },
        {
          id: 9,
          name: 'Product 9',
          description:
            'Odio doloremque similique. Similique molestiae repellendus at numquam neque. Veniam totam cupiditate perspiciatis.',
          image: 'https://picsum.photos/seed/gh5MuqK/600/600',
          price: 468,
          category: {
            name: 'Oils',
            order: 100,
          },
        },
      ]),
    )
  }),
]

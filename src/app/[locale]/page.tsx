import { getTranslations } from 'next-intl/server';
import styles from './App.module.scss';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <main className={styles.main}>
      <h2>{t('title')}</h2>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit velit dicta
      quod nobis assumenda voluptate ullam, cupiditate voluptatem? Nulla a quis
      libero? Voluptatum commodi doloribus ab similique non. Voluptatem,
      laudantium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
      velit dicta quod nobis assumenda voluptate ullam, cupiditate voluptatem?
      Nulla a quis libero? Voluptatum commodi doloribus ab similique non.
      Voluptatem, laudantium? Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Fugit velit dicta quod nobis assumenda voluptate ullam, cupiditate
      voluptatem? Nulla a quis libero? Voluptatum commodi doloribus ab similique
      non. Voluptatem, laudantium? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Fugit velit dicta quod nobis assumenda voluptate ullam,
      cupiditate voluptatem? Nulla a quis libero? Voluptatum commodi doloribus
      ab similique non. Voluptatem, laudantium? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Fugit velit dicta quod nobis assumenda
      voluptate ullam, cupiditate voluptatem? Nulla a quis libero? Voluptatum
      commodi doloribus ab similique non. Voluptatem, laudantium? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Fugit velit dicta quod nobis
      assumenda voluptate ullam, cupiditate voluptatem? Nulla a quis libero?
      Voluptatum commodi doloribus ab similique non. Voluptatem, laudantium?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit velit dicta
      quod nobis assumenda voluptate ullam, cupiditate voluptatem? Nulla a quis
      libero? Voluptatum commodi doloribus ab similique non. Voluptatem,
      laudantium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
      velit dicta quod nobis assumenda voluptate ullam, cupiditate voluptatem?
      Nulla a quis libero? Voluptatum commodi doloribus ab similique non.
      Voluptatem, laudantium? Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Fugit velit dicta quod nobis assumenda voluptate ullam, cupiditate
      voluptatem? Nulla a quis libero? Voluptatum commodi doloribus ab similique
      non. Voluptatem, laudantium? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Fugit velit dicta quod nobis assumenda voluptate ullam,
      cupiditate voluptatem? Nulla a quis libero? Voluptatum commodi doloribus
      ab similique non. Voluptatem, laudantium? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Fugit velit dicta quod nobis assumenda
      voluptate ullam, cupiditate voluptatem? Nulla a quis libero? Voluptatum
      commodi doloribus ab similique non. Voluptatem, laudantium? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Fugit velit dicta quod nobis
      assumenda voluptate ullam, cupiditate voluptatem? Nulla a quis libero?
      Voluptatum commodi doloribus ab similique non. Voluptatem, laudantium?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit velit dicta
      quod nobis assumenda voluptate ullam, cupiditate voluptatem? Nulla a quis
      libero? Voluptatum commodi doloribus ab similique non. Voluptatem,
      laudantium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
      velit dicta quod nobis assumenda voluptate ullam, cupiditate voluptatem?
      Nulla a quis libero? Voluptatum commodi doloribus ab similique non.
      Voluptatem, laudantium? Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Fugit velit dicta quod nobis assumenda voluptate ullam, cupiditate
      voluptatem? Nulla a quis libero? Voluptatum commodi doloribus ab similique
      non. Voluptatem, laudantium? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Fugit velit dicta quod nobis assumenda voluptate ullam,
      cupiditate voluptatem? Nulla a quis libero? Voluptatum commodi doloribus
      ab similique non. Voluptatem, laudantium? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Fugit velit dicta quod nobis assumenda
      voluptate ullam, cupiditate voluptatem? Nulla a quis libero? Voluptatum
      commodi doloribus ab similique non. Voluptatem, laudantium? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Fugit velit dicta quod nobis
      assumenda voluptate ullam, cupiditate voluptatem? Nulla a quis libero?
      Voluptatum commodi doloribus ab similique non. Voluptatem, laudantium?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit velit dicta
      quod nobis assumenda voluptate ullam, cupiditate voluptatem? Nulla a quis
      libero? Voluptatum commodi doloribus ab similique non. Voluptatem,
      laudantium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
      velit dicta quod nobis assumenda voluptate ullam, cupiditate voluptatem?
      Nulla a quis libero? Voluptatum commodi doloribus ab similique non.
      Voluptatem, laudantium? Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Fugit velit dicta quod nobis assumenda voluptate ullam, cupiditate
      voluptatem? Nulla a quis libero? Voluptatum commodi doloribus ab similique
      non. Voluptatem, laudantium? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Fugit velit dicta quod nobis assumenda voluptate ullam,
      cupiditate voluptatem? Nulla a quis libero? Voluptatum commodi doloribus
      ab similique non. Voluptatem, laudantium?
    </main>
  );
}

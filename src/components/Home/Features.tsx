import FeatureCard, { FeatureCardProps } from "./FeatureCard";
import styles from "./Features.module.scss";

export default function Features() {
  const features = [
    {
      title: "Free to Play",
      desciption: "Revive101 is completely free to play, with no pay-to-win mechanics.",
    },
    {
      title: "Reagents & Loot",
      desciption: "Collect reagents, discover loot and build your collection through exploration and gameplay.",
    },
    {
      title: "Spell Decks",
      desciption: "You can give yourself every spell in the game to test them out and find your favorites.",
    },
    {
      title: "Social & Multiplayer",
      desciption:
        "Play together with other players just like on the official servers, including shared worlds, combat and social interactions.",
    },
    {
      title: "Quests",
      desciption: "Take on quests and progress through the game's worlds using the quest system.",
    },
    {
      title: "Pets",
      desciption: "Own and manage pets, including support for pet-related gameplay and pet minigames.",
    },
    {
      title: "No Microtransactions",
      desciption: "There are no real-money purchases. Your progress and gameplay are not locked behind an in-game currency.",
    },
    {
      title: "Low Resource Requirements",
      desciption:
        "Servers can run on low-end hardware, making it accessible to a wide range of players. Imlight can run perfectly fine with 2GB of RAM and one CPU core.",
    },
    {
      title: "Community-Driven",
      desciption:
        "Unlike the official servers, Revive101 is an independent community project built openly by its developers and contributors.",
    },
    {
      title: "No Paywalls",
      desciption: "Access the game without having to purchase premium areas, items or other gameplay content.",
    },
    {
      title: "Open Source",
      desciption:
        "The server software powering Revive101 is publicly available, allowing the community to inspect, contribute to and improve the project.",
    },
    {
      title: "Your Server, Your Rules",
      desciption:
        "Because Revive101 is independently operated, the server environment can evolve beyond the limitations of the official service.",
    },
  ] as FeatureCardProps[];

  return (
    <div className={styles.featuresContent}>
      <div className={styles.title}>
        <h1>Features</h1>
      </div>
      <div className={styles.featuresList}>
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </div>
  );
}

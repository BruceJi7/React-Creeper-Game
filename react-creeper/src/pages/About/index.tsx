import { Link } from "react-router-dom";

import House from "../Game/House";
import HouseBase from "../Game/HouseBase";

import { multiclass } from "../../utility/functions";

import style from "./About.module.css";
import common from "../../style/css/common.module.css";

function About() {
  return (
    <div className={common.layout}>
      <div className={multiclass(common.teamHouse, common.teamA)}>
        <House score={4} />
        <HouseBase creepersFound={0} />
      </div>
      <div className={common.board}>
        <div className={style.about}>
          <div className={style.heading}>The Creeper Game</div>
          <p style={{ textAlign: "center" }}>
            A web-based classroom game for practicing <br /> flashcard
            recognition.
          </p>
          <Link to="/" className={common.link}>
            Back
          </Link>
          <div className={style.heading}>FAQ</div>
          <p>
            <div className={style.heading}>How do I play?</div>
            Split the students up into two teams. Students call out one of the
            flashcards. Click the flashcard to reveal what is hidden. There are
            12 blocks and 4 creepers randomly placed on the board.
          </p>
          <p>
            Finding 5 blocks will complete your house.
            <br />
            Finding a creeper will destroy your house! Watch out!
            <br />
          </p>
          <p>
            The game is over if one team finishes a house, or if all creepers
            are found.
            <br />
            If all creepers are found, the team with the most completed house
            wins.
          </p>
          <p>
            <div className={style.heading}>About the default flashcards</div>
            The default set of flashcards are letters a-p (16 letters).
            <br />
            If you use these letters, you can assign questions or tasks to each
            letter, or you might have some physical items students have to name.
          </p>
          <p>
            Tasks might include reading something - read and then a student can
            choose a letter to reveal. Or you might make a list of 16 actions or
            short conversations, and a student might choose a letter and have to
            perform whatever it is you chose.
          </p>
          <p>
            <div className={style.heading}>Can I change the flashcards?</div>
            You certainly can, and this is what the settings option allows you
            to do. Log in to the Creeper Game app, and you'll be able to save
            sets of images and re-use them.
            <br />
            Find the images online, and copy the image URLs, and paste them into
            the box. You'll need at least 16 images! Tips for choosing the
            flashcards are:
            <ul>
              <li>Make sure the image recogniseable when it's small</li>
              <li>Try to use an image that is at most 400 x 400px</li>
              <li>Use JPG, GIF or PNG images</li>
            </ul>
            If you want to use images from your own computer, upload them to an
            image hosting site and copy the URLs and paste them in.
            <br />
          </p>
          <p>
            <div className={style.heading}>
              I pasted in an image but it didn't load. The URL is weird.
            </div>
            It only accepts urls that end in .jpg, .png, or .gif.
            <br />
            If you paste in an image and it doesn't immediately load the image
            and clear the entry box, you need to pick a different image! Sorry!
            <br />
            <br />
            More detail: Sometimes when you copy an image from Google Images,
            you get something beginning with data:image.
            <br />
            That's actually the image, re-encoded as text! But the game doesn't
            handle that type of url, unfortunately.
          </p>
          <p>
            <div className={style.heading}>
              I added 16+ images but some showed up blank!
            </div>
            So all the game does is load images sourced from other sites. Some
            sites don't like people being able to embed their images in other
            sites, so they block them. It also struggles if you paste in huge
            image - all it's doing is scaling the image down. When you're adding
            the images the set preview will give you an example of how the image
            looks. If it looks no good, try a different, similar image!
          </p>
          <p>
            <div className={style.heading}>
              I want to paste in the same image multiple times
            </div>
            Er, you can do that I guess, but it will make the game awkward to
            play. Also if you try to delete those images it will delete all of
            them. Not a good idea!
          </p>
          <p>
            <div className={style.heading}>
              I found a bug! Something is broken! I want to ask for a feature!
            </div>
            <a
              href="https://github.com/BruceJi7/React-Creeper-Game/issues"
              target="_blank"
              rel="noreferrer"
            >
              The game code is here.
            </a>
            <br />
            If you find an issue, go ahead and register it there. Let me know
            exactly what you were doing when it happened! You can request
            features there too.
          </p>
          <p>
            <div className={style.heading}>Minecraft themed?</div>
            Minecraft is super popular even despite the age. <br /> It's quite
            easy to get kids excited about practicing English or whatever by
            hyping up this game to them.
            <br /> I don't own Minecraft, so sorry that I used Minecraft IP, but
            it plays into kids' interests so it really helps. Also this site
            makes 0 money lol.
          </p>
          <p>
            <div className={style.heading}>Any other games?</div>
            Not right now. Nothing web-based, for sure. Sorry!
          </p>
          <p>
            <div className={style.heading}>Who are you?</div>
            I'm Toby. I'm a front-end web developer for a blockchain company. I
            live in South Korea.
          </p>

          <p>
            I used to be an English teacher in an after-school academy. Kids
            weren't super motivated since they were tired and English is
            something the kids' parents wanted them to do lol.
            <br />
            So, I figured I would trick the kids into learning/practicing their
            English by making games for them to play in class. It went pretty
            well.
            <br />
            It turns out programming suits me better, hence the career change!
          </p>
          <p>
            <div className={style.heading}>
              One horse-sized duck, or 100 duck-sized horses?
            </div>
            Do you get preparation/guns? The giant duck. Else, the swarm of
            horses!
          </p>
          <Link to="/" className={common.link}>
            Back
          </Link>
        </div>
      </div>
      <div className={multiclass(common.teamHouse, common.teamB)}>
        <House score={4} />
        <HouseBase creepersFound={0} />
      </div>
    </div>
  );
}

export default About;

/**
 * Site footer with the flagship and its two modules in the primary positions.
 *
 * Secondary products remain discoverable in a quieter column. Private products
 * are omitted because this server-rendered footer is public.
 */

import Image from 'next/image';
import Link from 'next/link';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Image
            src="/icons/sixsmith-logo.png"
            alt=""
            width={64}
            height={64}
          />
          <div>
            <strong>GameMaster Studio</strong>
            <p>
              Campaign memory in GameMasterCraft. Encounter control in VCS.
              Built for GMs who would rather run the game than fight their tools.
            </p>
          </div>
        </div>

        <div>
          <h2>GameMaster Studio</h2>
          <Link href="/#why-studio">Why Studio</Link>
          <Link href="/apps/gamemastercraft">GameMasterCraft</Link>
          <Link href="/apps/virtual-combat-simulator">Virtual Combat Simulator</Link>
          <Link href="/pricing">Plans and pricing</Link>
        </div>

        <div>
          <h2>More from Sixsmith Games</h2>
          <Link href="/apps/fourstargeneral">Four Star General</Link>
          <Link href="/apps/mastertyping">MasterTyping</Link>
          <Link href="/apps/gravity">Gravity</Link>
        </div>

        <div>
          <h2>Help</h2>
          <Link href="/articles">Guides</Link>
          <Link href="/help">Product help</Link>
          <Link href="/support">Contact support</Link>
          <Link href="/about">About Sixsmith Games</Link>
        </div>
      </div>

      <div className={styles.legal}>
        <span>© {new Date().getFullYear()} Sixsmith Games</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:info@sixsmithgames.com">info@sixsmithgames.com</a>
        </div>
      </div>
    </footer>
  );
}

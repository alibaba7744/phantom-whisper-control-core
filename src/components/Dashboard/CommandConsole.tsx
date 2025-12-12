
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Terminal as TerminalIcon, Play, X, Maximize2, ChevronDown, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CommandConsoleProps {
  className?: string;
}

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string;
  timestamp: string;
}

// CTF Configuration
const FLAG = "FLAG{R00T_4CC3SS_GR4NT3D_2024}";
const ADMIN_PASSWORD = "shadowroot";

const HINTS = [
  "Indice 1: Essayez 'help' pour voir les commandes disponibles.",
  "Indice 2: Le fichier /etc/passwd contient des informations intéressantes...",
  "Indice 3: Cherchez dans les fichiers cachés avec 'ls -la'",
  "Indice 4: Le mot de passe admin pourrait être dans un fichier de configuration...",
];

const FILESYSTEM: Record<string, string> = {
  '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nadmin:x:1000:1000:admin:/home/admin:/bin/bash\nguest:x:1001:1001:guest:/home/guest:/bin/bash',
  '/etc/shadow': '[ACCÈS REFUSÉ] - Permissions insuffisantes',
  '/home/admin/.bash_history': 'ssh root@192.168.1.1\ncat /var/log/auth.log\nnano /opt/.secret_config',
  '/opt/.secret_config': '# Configuration secrète\n# NE PAS PARTAGER\nadmin_password=shadowroot\nbackup_server=192.168.1.50',
  '/var/log/auth.log': 'May 21 14:30:22 server sshd: Failed password for admin\nMay 21 14:30:45 server sshd: Accepted password for admin\nMay 21 14:31:02 server sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root',
  '/root/flag.txt': '[ACCÈS REFUSÉ] - Vous devez être root pour lire ce fichier',
};

const CommandConsole: React.FC<CommandConsoleProps> = ({ className }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'welcome',
      type: 'system',
      content:
        '╔══════════════════════════════════════════════════════════════╗\n║           SYSTÈME DE CONTRÔLE C2 - TERMINAL v2.4             ║\n║                                                              ║\n║  [!] Accès restreint - Authentification requise              ║\n║  [?] Tapez "help" pour voir les commandes disponibles        ║\n╚══════════════════════════════════════════════════════════════╝',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = (type: TerminalLine['type'], content: string) => {
    const newLine: TerminalLine = {
      id: `line-${Date.now()}-${Math.random()}`,
      type,
      content,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    setLines((prev) => [...prev, newLine]);
  };

  const processCommand = (cmd: string) => {
    const parts = cmd.trim().toLowerCase().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    addLine('input', `$ ${cmd}`);

    switch (command) {
      case 'help':
        addLine(
          'output',
          `Commandes disponibles:
  help          - Affiche cette aide
  whoami        - Affiche l'utilisateur actuel
  ls [path]     - Liste les fichiers
  cat <file>    - Affiche le contenu d'un fichier
  su <password> - Connexion administrateur
  hint          - Obtenir un indice
  clear         - Effacer le terminal
  id            - Affiche les informations utilisateur
  pwd           - Affiche le répertoire courant
  uname -a      - Informations système`,
        );
        break;

      case 'whoami':
        addLine('output', isAdmin ? 'root' : 'guest');
        break;

      case 'id':
        addLine(
          'output',
          isAdmin
            ? 'uid=0(root) gid=0(root) groups=0(root)'
            : 'uid=1001(guest) gid=1001(guest) groups=1001(guest)',
        );
        break;

      case 'pwd':
        addLine('output', isAdmin ? '/root' : '/home/guest');
        break;

      case 'uname':
        addLine('output', 'Linux c2-server 5.15.0-generic #1 SMP x86_64 GNU/Linux');
        break;

      case 'ls': {
        const path = args[0] || '';
        if (args.includes('-la') || args.includes('-a')) {
          addLine(
            'output',
            `drwxr-xr-x  2 root root 4096 May 21 14:00 .
drwxr-xr-x  3 root root 4096 May 21 13:00 ..
-rw-r--r--  1 root root  220 May 21 12:00 .bashrc
-rw-------  1 root root   45 May 21 14:30 .bash_history
drwxr-xr-x  2 root root 4096 May 21 10:00 etc/
drwxr-xr-x  3 root root 4096 May 21 11:00 home/
drwxr-xr-x  2 root root 4096 May 21 09:00 opt/
drwxr-xr-x  2 root root 4096 May 21 08:00 var/
${isAdmin ? '-r--------  1 root root   32 May 21 14:00 flag.txt' : ''}`,
          );
        } else if (path === '/opt' || path === 'opt') {
          addLine('output', `.secret_config`);
        } else if (path === '/etc' || path === 'etc') {
          addLine('output', `passwd  shadow  hosts  hostname`);
        } else if (path === '/home/admin' || path === 'home/admin') {
          addLine('output', `.bash_history  .bashrc  documents/`);
        } else {
          addLine('output', `etc/  home/  opt/  var/  tmp/`);
        }
        break;
      }

      case 'cat': {
        if (!args[0]) {
          addLine('error', 'Usage: cat <fichier>');
          break;
        }

        const rawPath = args[0];
        const filePath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

        if (
          filePath === '/root/flag.txt' ||
          filePath === '/flag.txt' ||
          rawPath === 'flag.txt'
        ) {
          if (isAdmin) {
            addLine(
              'success',
              `\n🚩 FÉLICITATIONS! Vous avez trouvé le flag!\n\n${FLAG}\n\n[!] Soumettez ce flag pour valider l'épreuve.`,
            );
          } else {
            addLine('error', "[ACCÈS REFUSÉ] - Vous devez être root pour lire ce fichier");
          }
        } else if (FILESYSTEM[filePath]) {
          addLine('output', FILESYSTEM[filePath]);
        } else {
          addLine('error', `cat: ${args[0]}: Aucun fichier ou dossier de ce type`);
        }
        break;
      }

      case 'su':
        if (!args[0]) {
          addLine('error', 'Usage: su <password>');
          addLine('output', "Indice: Trouvez le mot de passe administrateur dans le système...");
          break;
        }
        if (args[0] === ADMIN_PASSWORD) {
          setIsAdmin(true);
          addLine(
            'success',
            `
╔══════════════════════════════════════════════════════════════╗
║              🔓 ACCÈS ROOT ACCORDÉ                           ║
║                                                              ║
║  Bienvenue, administrateur.                                  ║
║  Vous avez maintenant accès complet au système.              ║
║                                                              ║
║  Indice: Cherchez le fichier flag.txt...                     ║
╚══════════════════════════════════════════════════════════════╝`,
          );
        } else {
          addLine('error', "su: Échec d'authentification - Mot de passe incorrect");
        }
        break;

      case 'hint':
        addLine('system', HINTS[hintIndex % HINTS.length]);
        setHintIndex((prev) => prev + 1);
        break;

      case 'clear':
        setLines([]);
        break;

      case 'exit':
        if (isAdmin) {
          setIsAdmin(false);
          addLine(
            'system',
            "Déconnexion du compte root. Retour à l'utilisateur guest.",
          );
        } else {
          addLine('output', 'logout');
        }
        break;

      case '':
        break;

      default:
        addLine('error', `${command}: commande non trouvée. Tapez 'help' pour l'aide.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setCommandHistory((prev) => [...prev, inputValue]);
    setHistoryIndex(-1);
    processCommand(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  return (
    <div className={cn('bg-card rounded-lg border border-border flex flex-col h-full', className)}>
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-primary" />
          <h2 className="font-medium text-sm">Terminal CTF</h2>
          {isAdmin ? (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-green-950/50 text-green-500">
              <Unlock size={12} />
              root
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-red-950/50 text-red-500">
              <Lock size={12} />
              guest
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronDown size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Maximize2 size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
          >
            <X size={14} />
          </Button>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 p-3 overflow-y-auto bg-black/80 font-mono text-sm"
      >
        {lines.map((line) => (
          <div key={line.id} className="mb-1">
            <pre
              className={cn(
                'whitespace-pre-wrap break-words',
                line.type === 'input' && 'text-primary font-bold',
                line.type === 'output' && 'text-muted-foreground',
                line.type === 'error' && 'text-red-500',
                line.type === 'success' && 'text-green-500',
                line.type === 'system' && 'text-secondary',
              )}
            >
              {line.content}
            </pre>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2">
        <div className="flex items-center text-primary font-mono text-sm mr-1">
          {isAdmin ? '#' : '$'}
        </div>
        <Input
          className="bg-black/30 border-muted font-mono"
          placeholder="Entrez une commande..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
        />
        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
          <Play size={16} />
        </Button>
      </form>
    </div>
  );
};

export default CommandConsole;

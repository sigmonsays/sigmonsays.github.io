;; the contents of this file (config.el) are automatically combined from config.org
;; make all your edits in config.org

;; Utility functions
(defun my-file-contents (filename)
  "Return the contents of FILENAME."
  (with-temp-buffer
    (insert-file-contents filename)
    (buffer-string)))

;; Some functionality uses this to identify you, e.g. GPG configuration, email
;; clients, file templates and snippets.
(setq user-full-name "Sig Lange"
      user-mail-address "sig.lange@gmail.com")

;; dashboard
(defun my-weebery-is-always-greater ()
  (let* ((banner '("+-------------------------------+"
                   "|                               |"
                   "+-------------------------------+ "))
                   ;---------------------------------;
         (longest-line (apply #'max (mapcar #'length banner))))
    (put-text-property
     (point)
     (dolist (line banner (point))
       (insert (+doom-dashboard--center
                +doom-dashboard--width
                (concat line (make-string (max 0 (- longest-line (length line))) 32)))
               "\n"))
     'face 'doom-dashboard-banner)))

(setq +doom-dashboard-ascii-banner-fn #'my-weebery-is-always-greater)

(setq +format-on-save-enabled-modes
      '(not emacs-lisp-mode  ; elisp's mechanisms are good enough
            sql-mode         ; sqlformat is currently broken
            tex-mode         ; latexindent is broken
            org-mode
            sh-mode
            latex-mode))

(setq apheleia-inhibit-functions '(always))

(after! treemacs
  (treemacs-follow-mode 1))

;; blinking cursor
(blink-cursor-mode 0)

;; This determines the style of line numbers in effect. If set to `nil', line
;; numbers are disabled. For relative line numbers, set this to `relative'.
(setq display-line-numbers-type t)

;; (global-set-key [f5] 'hl-line-mode)
(remove-hook 'doom-first-buffer-hook #'global-hl-line-mode)

(setq doom-localleader-key ",")

;; (server-start)
; (pcre-mode +1)

(defun save-all () (interactive) (save-some-buffers t))
(global-set-key (kbd "C-S") 'save-all)

;; disable automatically adding various pairs of matching parentheses
(remove-hook 'doom-first-buffer-hook #'smartparens-global-mode)

;; (setq +notmuch-sync-backend 'mbsync)

;; Configure notmuch-hello
(setq +notmuch-home-function (lambda () (notmuch-search "tag:inbox")))

;; save current cursor position in files
(save-place-mode 1)

(setq confirm-kill-emacs nil)

(setq bookmark-save-flag 1)
(setq sentence-end-double-space nil)
(setq delete-selection-mode t)

;; Doom exposes five (optional) variables for controlling fonts in Doom. Here
;; are the three important ones:
;;
;; + `doom-font'
;; + `doom-variable-pitch-font'
;; + `doom-big-font' -- used for `doom-big-font-mode'; use this for
;;   presentations or streaming.
;;
;; They all accept either a font-spec, font string ("Input Mono-12"), or xlfd
;; font string. You generally only need these two:
;; (setq doom-font (font-spec :family "monospace" :size 12 :weight 'semi-light)
;;       doom-variable-pitch-font (font-spec :family "sans" :size 13))

;; There are two ways to load a theme. Both assume the theme is installed and
;; available. You can either set `doom-theme' or manually load a theme with the
;; `load-theme' function.
;; This is the default: doom-one
;; (setq doom-theme 'doom-one)
;; (setq doom-theme 'doom-spacegrey)
;; notes
;; - zenburn seems easy to read on my laptop, in the morning

;; (ef-themes-select 'ef-bio)

;(setq doom-theme 'doom-zenburn)
(setq doom-theme 'doom-spacegrey)

(setq projectile-use-native-indexing t)

;; (after! nix-mode
;;   (setq nix-nixfmt-bin "alejandra --quiet"))
;; (set-formatter! 'alejandra "alejandra --quiet" :modes '(nix-mode))
;;(set-formatter! 'alejandra '("alejandra" "--quiet") :modes '(nix-mode))
(after! nix-mode
  (set-formatter! 'alejandra '("alejandra" "--quiet") :modes '(nix-mode))
  (map! :localleader
        :map nix-mode-map
        :desc "nix-format-buffer" "p" #'+format/buffer))

;;(after! go-mode
;;        (setq gofmt-command "goimports")
;;)

;;(add-hook 'go-mode-hook 'lsp-deferred)

(setq lsp-enable-file-watchers nil)

(setq lsp-gopls-codelens nil)

(after! go-mode
  (setq gofmt-command "goimports")
  ;; (add-hook 'go-mode-hook
  ;;           (lambda ()
  ;;             (add-hook 'after-save-hook 'gofmt nil 'make-it-local))))
  (add-hook 'go-mode-hook
            (lambda ()
              (add-hook 'before-save-hook 'gofmt nil 'make-it-local))))

;; (after! go-mode
;;   (set-lookup-handlers! 'go-mode
;;     :definition #'godef-jump
;;     :references #'go-guru-referrers
;;     :documentation #'godoc-at-point))

(defun company-is-kind (match candidate)
        (when-let
            (kind (company-call-backend 'kind candidate))
            (member match (alist-get kind company-text-icons-mapping))
        )
)
(defun company-sort-prefer-members (candidates)
        "Prefer CANDIDATES that are members."
        ;; (message "Candidate: %s" (pop candidates))
        ;; (message "Text: %s" (company-call-backend 'kind (pop candidates)))

        ;;(message "%s" (company-fetch-metadata ))
        (cl-loop for candidate in candidates
                ;;if (string-suffix-p ")" candidate)
                if (company-is-kind "f" candidate)
                collect candidate into fields
                else if (company-is-kind "m" candidate)
                collect candidate into methods
                else if (company-is-kind "c" candidate)
                collect candidate into consts
                else collect candidate into other
                finally return (append fields consts methods other)))

(after! (:and company lsp-mode lsp-rust)
  (setq company-transformers '(company-sort-prefer-members))
)

(after! lsp-rust
  (add-to-list 'lsp-file-watch-ignored-directories "[/\\\\]vendor\\'")
  (setq lsp-rust-analyzer-display-chaining-hints t
        lsp-rust-analyzer-display-parameter-hints t
        lsp-rust-analyzer-completion-add-call-argument-snippets t
        lsp-rust-analyzer-experimental-proc-attr-macros t
        lsp-rust-analyzer-proc-macro-enable t
        lsp-rust-analyzer-call-info-full t
        lsp-rust-analyzer-inlay-chain-format " : %s"
        lsp-rust-analyzer-max-inlay-hint-length 40
;;        lsp-inlay-hint-enable t
  )
  (map! :localleader :map rustic-mode-map "i" 'lsp-inlay-hints-mode)
  (map! :localleader :map rustic-mode-map "tl" 'rustic-cargo-test-rerun)
  (map! :localleader :map rustic-mode-map "c" 'rustic-cargo-check)
  (map! :localleader :map rustic-mode-map "f" 'rustic-cargo-fmt)
  (map! :localleader :map rustic-mode-map "a" 'lsp-execute-code-action)
)

;; If you use `org' and don't want your org files in the default location below,
;; change `org-directory'. It must be set before org loads!


;; org-capture
;; (setq org-default-notes-file (concat org-directory "/notes.org"))
(global-set-key (kbd "C-c l") 'org-store-link)
(global-set-key (kbd "C-c a") 'org-agenda)
(global-set-key (kbd "C-c c") 'org-capture)

(setq org-directory "~/org")
(after! org
  (setq org-log-done t))
(after! org
  (setq org-agenda-files '("~/org/")))

; xorg clipboard handling
(setq x-select-enable-primary t)
(setq x-select-enable-clipboard t)

(defun copy-to-clipboard ()
  (interactive)
  (if (display-graphic-p)
      (progn
        (message "Yanked region to x-clipboard!")
        (call-interactively 'clipboard-kill-ring-save)
        )
    (if (region-active-p)
        (progn
          (shell-command-on-region (region-beginning) (region-end) "xsel -i -b")
          (message "Yanked region to clipboard!")
          (deactivate-mark))
      (message "No region active; can't yank to clipboard!")))
  )

(defun paste-from-clipboard ()
  (interactive)
  (if (display-graphic-p)
      (progn
        (clipboard-yank)
        (message "graphics active")
        )
    (insert (shell-command-to-string "xsel -o -b"))
    )
  )

(global-set-key [f8] 'copy-to-clipboard)
(global-set-key [f9] 'paste-from-clipboard)

; ibuffer grouping
(use-package ibuffer-vc
  :ensure t
  :init
  :config
  (add-hook 'ibuffer-hook
            (lambda ()
              (ibuffer-vc-set-filter-groups-by-vc-root)
              (unless (eq ibuffer-sorting-mode 'alphabetic)
                (ibuffer-do-sort-by-alphabetic)))))

;(make-directory "~/Sync/org/roam")
(setq org-roam-directory (file-truename "~/Sync/org/roam"))
;(setq org-roam-database-connector 'sqlite-builtin)
;(org-roam-db-autosync-mode)
; - initial setup
; - run M-x org-roam-db-sync

(add-hook 'dired-mode-hook
          (lambda ()
            (when (file-remote-p dired-directory)
              (setq-local dired-actual-switches "-alhB"))
            (setq dired-auto-revert-buffer t)
        ))

(use-package! literate-calc-mode )

;; snippets
(yas-global-mode 1)
(add-to-list 'load-path
              "~/.emacs.d/plugins/yasnippet")

(require 'restclient)

(org-babel-do-load-languages
 'org-babel-load-languages
 '((restclient . t)))

;; recoll
(use-package! org-recoll
  :after org)

(global-set-key (kbd "C-c g") 'org-recoll-search)
(global-set-key (kbd "C-c u") 'org-recoll-update-index)

;; tmsu.el
(use-package! tmsu
  :after dired)

;; https://github.com/karthink/gptel#doom-emacs
(use-package! gptel
 :config
 (setq! gptel-model "gpt-3.5-turbo")
 (setq! gptel-api-key (my-file-contents "~/.secrets/chatgpt-api-key"))
)

import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BlueprintButtonComponent } from '@heavy-duty/blueprint-button';
import { Wallet } from '@heavy-duty/wallet-adapter';
import { HdWalletListItemComponent } from '@heavy-duty/wallet-adapter-cdk';
import { ComponentStore } from '@ngrx/component-store';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { exhaustMap, tap } from 'rxjs';

interface ViewModel {
  isOpen: boolean;
}

const initialState: ViewModel = {
  isOpen: false,
};

@Directive({
  selector: '[hdWalletModalTrigger]',
  standalone: true,
  exportAs: 'hdWalletModalTrigger',
})
export class HdWalletModalTriggerDirective extends ComponentStore<ViewModel> {
  private readonly _matDialog = inject(MatDialog);

  @Input() hdPanelClass = '';
  @Output() hdSelectWallet = new EventEmitter<WalletName>();

  private readonly _handleOpen = this.effect<Wallet[]>(
    exhaustMap((wallets) => {
      this.patchState({ isOpen: true });

      return this._matDialog
        .open<HdWalletModalComponent, { wallets: Wallet[] }, WalletName>(
          HdWalletModalComponent,
          {
            panelClass: ['wallet-modal', ...this.hdPanelClass.split(' ')],
            maxWidth: '380px',
            maxHeight: '90vh',
            data: {
              wallets,
            },
          }
        )
        .afterClosed()
        .pipe(
          tap((walletName) => {
            if (walletName) {
              this.hdSelectWallet.emit(walletName);
            }
            this.patchState({ isOpen: false });
          })
        );
    })
  );

  constructor() {
    super(initialState);
  }

  open(wallets: Wallet[]) {
    this._handleOpen(wallets);
  }
}

@Component({
  selector: 'hd-wallet-modal',
  template: `
    <ng-container *ngIf="installedWallets.length > 0">
      <header>
        <button
          (click)="onClose()"
          bpButton
          aria-label="Close wallet adapter selection"
        >
          <mat-icon>close</mat-icon>
        </button>
        <h2>Connect a wallet on Solana to continue</h2>
      </header>

      <mat-selection-list
        [multiple]="false"
        (selectionChange)="onSelectionChange($event.options[0].value)"
      >
        <mat-list-option
          *ngFor="let wallet of installedWallets"
          [value]="wallet.adapter.name"
        >
          <hd-wallet-list-item [hdWallet]="wallet"></hd-wallet-list-item>
        </mat-list-option>
        <mat-expansion-panel
          #expansionPanel="matExpansionPanel"
          class="mat-elevation-z0"
          disabled
        >
          <ng-template matExpansionPanelContent>
            <mat-list-option
              *ngFor="let wallet of otherWallets"
              [value]="wallet.adapter.name"
            >
              <hd-wallet-list-item [hdWallet]="wallet"> </hd-wallet-list-item>
            </mat-list-option>
          </ng-template>
        </mat-expansion-panel>
      </mat-selection-list>

      <button
        *ngIf="otherWallets.length > 0"
        class="toggle-expand"
        (click)="expansionPanel.toggle()"
        bpButton
      >
        <span>
          {{ expansionPanel.expanded ? 'Less options' : 'More options' }}
        </span>
        <mat-icon [ngClass]="{ expanded: expansionPanel.expanded }">
          expand_more
        </mat-icon>
      </button>
    </ng-container>

    <ng-container *ngIf="installedWallets.length === 0">
      <header>
        <button
          bpButton
          mat-dialog-close
          aria-label="Close wallet adapter selection"
        >
          <mat-icon>close</mat-icon>
        </button>
        <h2>You'll need a wallet on Solana to continue</h2>
      </header>

      <button
        class="getting-started"
        (click)="onGettingStarted()"
        color="primary"
        bpButton
      >
        Get started
      </button>

      <mat-expansion-panel
        #expansionPanel="matExpansionPanel"
        class="mat-elevation-z0"
        disabled
      >
        <ng-template matExpansionPanelContent>
          <mat-selection-list
            [multiple]="false"
            (selectionChange)="onSelectionChange($event.options[0].value)"
          >
            <mat-list-option
              *ngFor="let wallet of otherWallets"
              [value]="wallet.adapter.name"
            >
              <hd-wallet-list-item [hdWallet]="wallet"> </hd-wallet-list-item>
            </mat-list-option>
          </mat-selection-list>
        </ng-template>
      </mat-expansion-panel>

      <button
        *ngIf="otherWallets.length > 0"
        class="toggle-expand"
        (click)="expansionPanel.toggle()"
        bpButton
      >
        <span>
          {{
            expansionPanel.expanded
              ? 'Hide options'
              : 'Already have a wallet? View options'
          }}
        </span>
        <mat-icon [ngClass]="{ expanded: expansionPanel.expanded }">
          expand_more
        </mat-icon>
      </button>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .mat-dialog-title {
        margin: 0;
      }

      header {
        margin-bottom: 2.5rem;
      }

      header h2 {
        font-size: 1.5rem;
        text-align: center;
        padding: 0 3rem;
        font-weight: bold;
      }

      header button {
        display: block;
        margin-left: auto;
        margin-right: 1rem;
        margin-top: 1rem;
      }

      .getting-started {
        display: block;
        margin: 2rem auto;
      }

      .toggle-expand {
        display: flex;
        justify-content: space-between;
        margin: 1rem 1rem 1rem auto;
        align-items: center;
      }

      .toggle-expand span {
        margin: 0;
      }

      .toggle-expand mat-icon {
        transition: 500ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      .toggle-expand mat-icon.expanded {
        transform: rotate(180deg);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    HdWalletListItemComponent,
    BlueprintButtonComponent
  ],
})
export class HdWalletModalComponent {
  private readonly _dialogRef =
    inject<MatDialogRef<HdWalletModalComponent, WalletName>>(MatDialogRef);
  private readonly _data = inject<{ wallets: Wallet[] }>(MAT_DIALOG_DATA);

  expanded = false;
  readonly installedWallets = this._data.wallets.filter(
    (wallet) => wallet.readyState === WalletReadyState.Installed
  );
  readonly otherWallets = [
    ...this._data.wallets.filter(
      (wallet) => wallet.readyState === WalletReadyState.Loadable
    ),
    ...this._data.wallets.filter(
      (wallet) => wallet.readyState === WalletReadyState.NotDetected
    ),
  ];
  readonly getStartedWallet = this.installedWallets.length
    ? this.installedWallets[0]
    : this._data.wallets.find(
      (wallet: { adapter: { name: WalletName } }) =>
        wallet.adapter.name === 'Phantom'
    ) ||
    this._data.wallets.find(
      (wallet: { adapter: { name: WalletName } }) =>
        wallet.adapter.name === 'Torus'
    ) ||
    this._data.wallets.find(
      (wallet: { readyState: WalletReadyState }) =>
        wallet.readyState === WalletReadyState.Loadable
    ) ||
    this.otherWallets[0];

  onSelectionChange(walletName: WalletName): void {
    this._dialogRef.close(walletName);
  }

  onGettingStarted(): void {
    this._dialogRef.close(this.getStartedWallet.adapter.name);
  }

  onClose(): void {
    this._dialogRef.close();
  }

  onToggleExpand(): void {
    this.expanded = !this.expanded;
  }
}

// import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
// import { CommonModule } from '@angular/common';
// import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// import { BlueprintButtonComponent } from '@heavy-duty/blueprint-button';
// import { Wallet } from '@heavy-duty/wallet-adapter';
// import { HdWalletListItemComponent } from '@heavy-duty/wallet-adapter-cdk';
// import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';

// @Component({
// 	selector: 'hd-wallet-modal',
// 	template: `
// 		<ng-container *ngIf="installedWallets.length > 0">
// 			<header>
// 				<button
// 					class="text-xs"
// 					(click)="onClose()"
// 					bpButton
// 					aria-label="Close wallet adapter selection"
// 				>
// 					<span class="material-icons text-base"> close </span>
// 				</button>
// 				<h2>Connect a wallet on Solana to continue</h2>
// 			</header>

// 			<ul>
// 				<li *ngFor="let wallet of installedWallets">
// 					<button
// 						class="w-full px-6 py-2 bg-white bg-opacity-0 hover:bg-opacity-5"
// 						(click)="onSelectionChange(wallet.adapter.name)"
// 					>
// 						<hd-wallet-list-item [wallet]="wallet"></hd-wallet-list-item>
// 					</button>
// 				</li>
// 				<ng-container *ngIf="expanded">
// 					<li *ngFor="let wallet of otherWallets">
// 						<button
// 							class="w-full px-6 py-2 bg-white bg-opacity-0 hover:bg-opacity-5"
// 							(click)="onSelectionChange(wallet.adapter.name)"
// 						>
// 							<hd-wallet-list-item [wallet]="wallet"> </hd-wallet-list-item>
// 						</button>
// 					</li>
// 				</ng-container>
// 			</ul>

// 			<button
// 				*ngIf="otherWallets.length > 0"
// 				class="toggle-expand text-xs"
// 				(click)="onToggleExpand()"
// 				bpButton
// 			>
// 				<span>
// 					{{ expanded ? 'Less options' : 'More options' }}
// 				</span>
// 				<span
// 					class="material-icons text-base"
// 					[ngClass]="{ expanded: expanded }"
// 				>
// 					expand_more
// 				</span>
// 			</button>
// 		</ng-container>

// 		<ng-container *ngIf="installedWallets.length === 0">
// 			<header>
// 				<button
// 					(click)="onClose()"
// 					bpButton
// 					aria-label="Close wallet adapter selection"
// 				>
// 					<span class="material-icons text-base"> close </span>
// 				</button>
// 				<h2>You'll need a wallet on Solana to continue</h2>
// 			</header>

// 			<ul *ngIf="expanded">
// 				<li *ngFor="let wallet of otherWallets">
// 					<button
// 						class="w-full px-6 py-2 bg-white bg-opacity-0 hover:bg-opacity-5"
// 						(click)="onSelectionChange(wallet.adapter.name)"
// 					>
// 						<hd-wallet-list-item [wallet]="wallet"> </hd-wallet-list-item>
// 					</button>
// 				</li>
// 			</ul>

// 			<button
// 				*ngIf="otherWallets.length > 0"
// 				class="toggle-expand text-xs"
// 				(click)="onToggleExpand()"
// 				bpButton
// 			>
// 				<span>
// 					{{
// 						expanded ? 'Hide options' : 'Already have a wallet? View options'
// 					}}
// 				</span>
// 				<span
// 					class="material-icons text-base"
// 					[ngClass]="{ expanded: expanded }"
// 				>
// 					expand_more
// 				</span>
// 			</button>
// 		</ng-container>
// 	`,
// 	styles: [
// 		`
// 			:host {
// 				display: block;
// 			}

// 			header {
// 				margin-bottom: 2.5rem;
// 			}

// 			header h2 {
// 				font-size: 1.5rem;
// 				text-align: center;
// 				padding: 0 3rem;
// 				font-weight: bold;
// 			}

// 			header button {
// 				display: block;
// 				margin-left: auto;
// 				margin-right: 1rem;
// 				margin-top: 1rem;
// 			}

// 			.getting-started {
// 				display: block;
// 				margin: 2rem auto;
// 			}

// 			.toggle-expand {
// 				display: flex;
// 				justify-content: space-between;
// 				margin: 1rem 1rem 1rem auto;
// 				align-items: center;
// 			}

// 			.toggle-expand span {
// 				margin: 0;
// 			}

// 			.toggle-expand .material-icons {
// 				transition: 500ms cubic-bezier(0.4, 0, 0.2, 1);
// 			}

// 			.toggle-expand .material-icons.expanded {
// 				transform: rotate(180deg);
// 			}
// 		`,
// 	],
// 	changeDetection: ChangeDetectionStrategy.OnPush,
// 	standalone: true,
// 	imports: [CommonModule, HdWalletListItemComponent, BlueprintButtonComponent],
// })
// export class HdWalletModalComponent {
// 	private readonly _dialogRef =
// 		inject<DialogRef<WalletName, HdWalletModalComponent>>(DialogRef);
// 	private readonly _data = inject<{ wallets: Wallet[] }>(DIALOG_DATA);

// 	expanded = false;
// 	readonly installedWallets = this._data.wallets.filter(
// 		(wallet) => wallet.readyState === WalletReadyState.Installed
// 	);
// 	readonly otherWallets = [
// 		...this._data.wallets.filter(
// 			(wallet) => wallet.readyState === WalletReadyState.Loadable
// 		),
// 		...this._data.wallets.filter(
// 			(wallet) => wallet.readyState === WalletReadyState.NotDetected
// 		),
// 	];
// 	readonly getStartedWallet = this.installedWallets.length
// 		? this.installedWallets[0]
// 		: this._data.wallets.find(
// 				(wallet: { adapter: { name: WalletName } }) =>
// 					wallet.adapter.name === 'Phantom'
// 		  ) ||
// 		  this._data.wallets.find(
// 				(wallet: { adapter: { name: WalletName } }) =>
// 					wallet.adapter.name === 'Torus'
// 		  ) ||
// 		  this._data.wallets.find(
// 				(wallet: { readyState: WalletReadyState }) =>
// 					wallet.readyState === WalletReadyState.Loadable
// 		  ) ||
// 		  this.otherWallets[0];

// 	onSelectionChange(walletName: WalletName): void {
// 		this._dialogRef.close(walletName);
// 	}

// 	onGettingStarted(): void {
// 		this._dialogRef.close(this.getStartedWallet.adapter.name);
// 	}

// 	onClose(): void {
// 		this._dialogRef.close();
// 	}

// 	onToggleExpand(): void {
// 		this.expanded = !this.expanded;
// 	}
// }

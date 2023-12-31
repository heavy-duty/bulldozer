import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BlueprintButtonComponent } from '@heavy-duty/blueprint-button';
import {
  HdSelectAndConnectWalletDirective,
  HdWalletAdapterDirective,
  HdWalletIconComponent,
} from '@heavy-duty/wallet-adapter-cdk';
import {
  HdWalletModalComponent,
  HdWalletModalTriggerDirective,
} from './modal.component';

@Component({
  selector: 'hd-wallet-modal-button',
  template: `
    <button
      #hdWalletModalTrigger="hdWalletModalTrigger"
      #hdSelectAndConnectWallet="hdSelectAndConnectWallet"
      *hdWalletAdapter="let wallets = wallets"
      (click)="hdWalletModalTrigger.open(wallets)"
      (hdSelectWallet)="hdSelectAndConnectWallet.run($event)"
      bpButton
      hdWalletModalTrigger
      hdSelectAndConnectWallet
    >
      <ng-content></ng-content>
      <ng-container *ngIf="!children">Select Wallet</ng-container>
    </button>
  `,
  styles: [
    `
      button {
        display: inline-block;
      }

      .button-content {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule,
    HdWalletAdapterDirective,
    HdWalletIconComponent,
    HdWalletModalTriggerDirective,
    HdSelectAndConnectWalletDirective,
    HdWalletModalComponent,
    BlueprintButtonComponent,
  ],
})
export class HdWalletModalButtonComponent {
  @ContentChild('children') children: ElementRef | null = null;
}

// import { CommonModule } from '@angular/common';
// import {
// 	ChangeDetectionStrategy,
// 	Component,
// 	ContentChild,
// 	ElementRef,
// } from '@angular/core';
// import { BlueprintButtonComponent } from '@heavy-duty/blueprint-button';
// import {
// 	HdWalletAdapterDirective,
// 	HdWalletModalButtonDirective,
// } from '@heavy-duty/wallet-adapter-cdk';
// import { HdWalletModalComponent } from './modal.component';

// @Component({
// 	selector: 'hd-wallet-modal-button',
// 	template: `
// 		<button
// 			*hdWalletAdapter="let wallets = wallets; let selectWallet = selectWallet"
// 			class="w-full"
// 			[wallets]="wallets"
// 			[template]="template"
// 			(selectWallet)="selectWallet($event)"
// 			bpButton
// 			hdWalletModalButton
// 			panelClass="bg-bp-wood bg-bp-brown"
// 		>
// 			<ng-content></ng-content>
// 			<ng-container *ngIf="!children">Select Wallet</ng-container>
// 		</button>

// 		<ng-template #template>
// 			<hd-wallet-modal></hd-wallet-modal>
// 		</ng-template>
// 	`,
// 	styles: [
// 		`
// 			button {
// 				display: inline-block;
// 			}

// 			.button-content {
// 				display: flex;
// 				gap: 0.5rem;
// 				align-items: center;
// 			}
// 		`,
// 	],
// 	changeDetection: ChangeDetectionStrategy.OnPush,
// 	standalone: true,
// 	imports: [
// 		CommonModule,
// 		HdWalletAdapterDirective,
// 		HdWalletModalButtonDirective,
// 		HdWalletModalComponent,
// 		BlueprintButtonComponent,
// 	],
// })
// export class HdWalletModalButtonComponent {
// 	@ContentChild('children') children?: ElementRef;
// }



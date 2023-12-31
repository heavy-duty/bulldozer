import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
} from '@angular/core';
import { BlueprintButtonComponent } from '@heavy-duty/blueprint-button';
import { Wallet } from '@heavy-duty/wallet-adapter';
import {
  HdDisconnectWalletDirective,
  HdWalletAdapterDirective,
  HdWalletIconComponent,
} from '@heavy-duty/wallet-adapter-cdk';

@Component({
  selector: 'hd-wallet-disconnect-button',
  template: `
		<button
			*hdWalletAdapter="let wallet = wallet; let disconnecting = disconnecting"
			hdDisconnectWallet
			bpButton
			class="w-full"
			[disabled]="disconnecting || !wallet"
		>
			<ng-content></ng-content>
			<div class="button-content" *ngIf="!children">
				<hd-wallet-icon *ngIf="wallet" [hdWallet]="wallet"></hd-wallet-icon>
				{{ getMessage(disconnecting, wallet) }}
			</div>
		</button>
	`,
  styles: [
    `
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
    CommonModule,
    HdWalletAdapterDirective,
    HdWalletIconComponent,
    HdDisconnectWalletDirective,
    BlueprintButtonComponent,
  ],
})
export class HdWalletDisconnectButtonComponent {
  @ContentChild('children') children: ElementRef | null = null;
  @Input() disabled = false;

  getMessage(disconnecting: boolean, wallet: Wallet | null) {
    if (disconnecting) return 'Disconnecting...';
    if (wallet) return 'Disconnect';
    return 'Disconnect Wallet';
  }
}

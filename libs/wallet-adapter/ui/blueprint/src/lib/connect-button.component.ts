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
  HdConnectWalletDirective,
  HdWalletAdapterDirective,
  HdWalletIconComponent,
} from '@heavy-duty/wallet-adapter-cdk';

@Component({
  selector: 'hd-wallet-connect-button',
  template: `
		<button
			*hdWalletAdapter="
				let wallet = wallet;
				let connecting = connecting;
				let connected = connected
			"
			hdConnectWallet
			bpButton
			class="w-full"
			[disabled]="connecting || !wallet || connected || disabled"
		>
			<ng-content></ng-content>
			<div class="button-content" *ngIf="!children">
				<hd-wallet-icon
					*ngIf="wallet !== null"
					[hdWallet]="wallet"
				></hd-wallet-icon>
				{{ getMessage(connected, connecting, wallet) }}
			</div>
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
    CommonModule,
    HdWalletAdapterDirective,
    HdWalletIconComponent,
    HdConnectWalletDirective,
    BlueprintButtonComponent,
  ],
})
export class HdWalletConnectButtonComponent {
  @ContentChild('children') children: ElementRef | null = null;
  @Input() disabled = false;

  getMessage(connected: boolean, connecting: boolean, wallet: Wallet | null) {
    if (connecting) return 'Connecting...';
    if (connected) return 'Connected';
    if (wallet) return 'Connect';
    return 'Connect Wallet';
  }
}

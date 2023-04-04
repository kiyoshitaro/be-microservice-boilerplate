import { NotificationBus } from './notification-bus';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ExplorerService } from './services/explorer.service';

@Module({
  imports: [],
  providers: [NotificationBus, ExplorerService],
  exports: [NotificationBus],
})
export class NotificationModule implements OnApplicationBootstrap {
  constructor(
    private readonly explorerService: ExplorerService,
    private readonly notificationBus: NotificationBus
  ) {}

  onApplicationBootstrap() {
    const { notifications } = this.explorerService.explore();
    this.notificationBus.register(notifications);
  }
}

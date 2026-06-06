import { NodeStatus } from '@/components/NodeStatus';
import { ConnectionInfo } from '@/components/ConnectionInfo';
import { UsageGuide } from '@/components/UsageGuide';
import { SecurityInfo } from '@/components/SecurityInfo';

export default function NodePage() {
  return (
    <div className="space-y-6">
      <NodeStatus />
      <ConnectionInfo />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <UsageGuide />
        <SecurityInfo />
      </div>
    </div>
  );
}

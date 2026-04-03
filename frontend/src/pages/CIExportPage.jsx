import { useState } from 'react'
import { exportCiWorkflow } from '../lib/api'
import { useGame } from '../lib/GameContext'
import { XP_REWARDS } from '../lib/gameState'
import CIExport from '../components/CIExport'

export default function CIExportPage({ tests }) {
  const [workflowYaml, setWorkflowYaml] = useState('')
  const { grantXP, tryUnlock } = useGame()

  async function onExport(framework) {
    const data = await exportCiWorkflow({ framework, tests })
    setWorkflowYaml(data.workflow_yaml || '')
    grantXP(XP_REWARDS.ci_export)
    tryUnlock('pipeline_master')
  }

  return (
    <>
      <div className="mb-6 border-b border-[var(--border)] pb-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          Quest Log
        </div>
        <h2 className="mt-2 font-heading text-3xl tracking-wide text-[var(--text-strong)]">
          🔨 The Forge
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Forge CI/CD workflow artifacts from your generated test arsenal.
        </p>
      </div>

      <CIExport onExport={onExport} yaml={workflowYaml} />
    </>
  )
}

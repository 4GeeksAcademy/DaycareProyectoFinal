import React, { useState, useEffect, useContext } from "react"
import { Context } from "../../store/appContext"
import { CheckCircle, XCircle } from "lucide-react"


const ApprovalsView = () => {
  const { store, actions } = useContext(Context)
  
 
  let approvals = store.approvals;

 
  useEffect(() => {
    actions.fetchApprovals()
  }, []);


  const handleApprove = async (id) => {

    await actions.updateApproval(id, "approved")
  }

  const handleReject = async (id) => {
    await actions.updateApproval(id, "rejected")
  }




  return (
    <div>
      <h2 className="tw-text-2xl tw-font-semibold tw-mb-6">Aprobaciones</h2>
      <div className="tw-space-y-4">
        {approvals.map((approval) => (
          <div key={approval.id} className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6">
            <div className="tw-flex tw-justify-between tw-items-start">
              <div>
                <h3 className="tw-text-lg tw-font-semibold tw-mb-2">{approval.type}</h3>
                <p className="tw-text-gray-600 tw-mb-1">Solicitante: {approval.name}</p>
                <p className="tw-text-gray-600 tw-mb-4">{approval.details}</p>
                <div className="tw-text-gray-500 tw-text-sm">Fecha de solicitud: {approval.date}</div>
              </div>
              <div className="tw-flex tw-space-x-2">
                {approval.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(approval.id)}
                      className="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-flex tw-items-center"
                    >
                      <CheckCircle className="tw-w-5 tw-h-5 tw-mr-2" />
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleReject(approval.id)}
                      className="tw-bg-red-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-flex tw-items-center"
                    >
                      <XCircle className="tw-w-5 tw-h-5 tw-mr-2" />
                      Rechazar
                    </button>
                  </>
                )}
                {approval.status === "approved" && (
                  <span className="tw-bg-green-100 tw-text-green-800 tw-px-2 tw-py-1 tw-rounded-full tw-text-sm tw-font-semibold">
                    Aprobado
                  </span>
                )}
                {approval.status === "rejected" && (
                  <span className="tw-bg-red-100 tw-text-red-800 tw-px-2 tw-py-1 tw-rounded-full tw-text-sm tw-font-semibold">
                    Rechazado
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApprovalsView


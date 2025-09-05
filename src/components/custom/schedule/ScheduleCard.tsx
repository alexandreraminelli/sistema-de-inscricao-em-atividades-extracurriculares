"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { activity, schedule } from "@/database/schema"
import { UserRole } from "@/types/auth/UserRole"
import { CalendarPlusIcon, CalendarRangeIcon, ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import ScheduleForm from "../form/ScheduleForm"
import ScheduleList from "./ScheduleList"

/** Props de `SessionCard`. */
interface Props {
  activity: typeof activity.$inferSelect
  userRole: UserRole
  schedules: (typeof schedule.$inferSelect)[]
}

/** Card de horário das atividades. */
export default function ScheduleCard({ activity, userRole, schedules }: Props) {
  // Estado para forçar atualização da lista de horários
  const [refreshKey, setRefreshKey] = useState(0)

  /** Função para atualizar a lista de horários quando houver uma criação ou edição. */
  function handleRefresh() {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <Card className="p-6 md:px-4 items-center">
      <Collapsible className="w-full">
        {/* Botão collapsible */}
        <CollapsibleTrigger className="w-full [&[data-state=open]_svg]:rotate-180">
          <CardHeader className="p-0 m-0 w-full flex flex-row justify-between items-center">
            <CalendarRangeIcon className="!rotate-0" />
            <CardTitle className="text-center">Horários</CardTitle>
            <ChevronDownIcon className="transition-all items-end" />
          </CardHeader>
        </CollapsibleTrigger>

        {/* Conteúdo do collapsible */}
        <CollapsibleContent>
          <CardContent className="p-0 m-0 mt-4 w-full md:max-w-48 lg:max-w-96 flex max-md:flex-row max-md:flex-wrap md:flex-col items-center justify-center gap-2 *:flex-1">
            {/* Lista de horários */}
            <ScheduleList activity={activity} schedules={schedules} userRole={userRole} refreshKey={refreshKey} classNameInfo="md:flex-col " />
          </CardContent>
          <CardFooter className="p-0 m-0 mt-4 gap-2.5 w-full max-md:flex-wrap md:flex-col *:flex-1 md:*:w-full">
            {/* Botões dos professores */}
            {userRole === "teacher" && (
              <Dialog>
                <DialogTrigger asChild>
                  {/* Botão de adicionar horário */}
                  <Button variant="default">
                    <CalendarPlusIcon /> Adicionar Horário
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Horário</DialogTitle>
                  </DialogHeader>
                  {/* Form de adicionar horário */}
                  <ScheduleForm type="create" activity={activity} inDialog updateSchedules={handleRefresh} />
                </DialogContent>
              </Dialog>
            )}
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ConfigurationsTable({ configurations }) {
  return (
    <div className="rounded-md border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parameter</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Min/Max Threshold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {configurations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No configurations found
              </TableCell>
            </TableRow>
          ) : (
            configurations.map((config) => (
              <TableRow key={config.id}>
                <TableCell className="font-medium">
                  {config.parameter_name}
                </TableCell>
                <TableCell>{config.locations?.name || "N/A"}</TableCell>
                <TableCell>
                  {config.locations?.companies?.name || "N/A"}
                </TableCell>
                <TableCell>
                  {config.parameter_value} {config.unit || ""}
                </TableCell>
                <TableCell>
                  {config.min_threshold !== null &&
                  config.max_threshold !== null
                    ? `${config.min_threshold} - ${config.max_threshold} ${
                        config.unit || ""
                      }`
                    : "Not set"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

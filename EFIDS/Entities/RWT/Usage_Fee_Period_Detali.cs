namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Usage_Fee_Period_Detali")]
    public partial class Usage_Fee_Period_Detali
    {
        public int id { get; set; }

        public int? id_usage_fee_period { get; set; }

        public int? code_stn_from { get; set; }

        public int? id_cargo_arrival { get; set; }

        public int? code_stn_to { get; set; }

        public int? id_cargo_outgoing { get; set; }

        public int? grace_time { get; set; }

        public virtual Directory_Cargo Directory_Cargo { get; set; }

        public virtual Directory_Cargo Directory_Cargo1 { get; set; }

        public virtual Directory_ExternalStation Directory_ExternalStation { get; set; }

        public virtual Directory_ExternalStation Directory_ExternalStation1 { get; set; }

        public virtual Usage_Fee_Period Usage_Fee_Period { get; set; }
    }
}

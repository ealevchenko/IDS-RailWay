namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.InstructionalLettersWagon")]
    public partial class InstructionalLettersWagon
    {
        public int id { get; set; }

        public int id_instructional_letters { get; set; }

        public int num { get; set; }

        public DateTime? close { get; set; }

        public int? close_status { get; set; }

        [StringLength(200)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual InstructionalLetters InstructionalLetters { get; set; }
    }
}
